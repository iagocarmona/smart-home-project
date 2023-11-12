import { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { HStack, VStack, useTheme, Text, ScrollView, Box } from 'native-base'

// Components
import { Loading } from '../components/Loading'
import { Header } from '../components/Header'
import { OrderProps } from '../components/Order'
import { CardDetails } from '../components/cardDetails'

import {
  CircleWavyCheck,
  Clipboard,
  ClipboardText,
  DesktopTower,
  Hourglass,
} from 'phosphor-react-native'

import firestore from '@react-native-firebase/firestore'
import { OrderFirestoreDTO } from '../DTOs/orderFirestoreDTO'
import { dateFormat } from '../utils/firestoreDateFormat'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from 'react-native'

type RouteParams = {
  orderId: string
}

type OrderDatails = OrderProps & {
  description: string
  solution: string
  closed: string
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true)
  const [solution, setSolution] = useState('')
  const [order, serOrder] = useState<OrderDatails>({} as OrderDatails)

  const { colors } = useTheme()
  const navigation = useNavigation()

  const route = useRoute()
  const { orderId } = route.params as RouteParams

  function handleOrderClose() {
    if (!solution) {
      return Alert.alert(
        'Solicitação',
        'Informe a solução para encerrar a solicitação.'
      )
    }

    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closedAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'solicitação encerrada.')
        navigation.goBack()
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação.')
      })
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          description,
          status,
          createdAt,
          closedAt,
          solution,
        } = doc.data()

        const closed = closedAt ? dateFormat(closedAt) : null

        serOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(createdAt),
          closed,
        })
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>
      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}
        <Text
          fontSize="sm"
          color={
            order.status === 'closed'
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === 'closed' ? 'finalzado' : 'em andamento'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Equipamento"
          description={`Patrimonio ${order.patrimony}`}
          icon={DesktopTower}
        />

        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === 'open' && (
            <Input
              placeholder="Descrição da solicitação"
              onChangeText={setSolution}
              h={24}
              textAlignVertical="top"
              multiline
            />
          )}
        </CardDetails>
      </ScrollView>
      {order.status === 'open' && (
        <Button title="Encerrar solicitação" m={5} onPress={handleOrderClose} />
      )}
    </VStack>
  )
}
