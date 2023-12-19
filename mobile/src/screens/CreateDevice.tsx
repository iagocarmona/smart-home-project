import { useEffect, useState } from "react";
import {
  VStack,
  Heading,
  Icon,
  useTheme,
  HStack,
  Select,
  CheckIcon,
  Text,
  Box,
} from "native-base";
import { Alert, FlatList, TouchableOpacity } from "react-native";

import { ArrowLeft, Copy, PencilSimple } from "phosphor-react-native";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { DeviceController } from "../controllers/device.controller";
import { TextArea } from "../components/TextAreaInput";
import { useNavigation } from "@react-navigation/native";
import { DeviceDTO } from "../DTO/device.dto";
import { DeviceTypes } from "../utils/enums";
import { DeviceTypesDTO } from "../DTO/deviceType.dto";
import { useClipboard } from "native-base";

export function CreateDevice() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deviceTypes, setDeviceTypes] = useState<DeviceTypesDTO[]>();
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>();
  const [topic, setTopic] = useState<string>("");

  const { colors } = useTheme();
  const navigation = useNavigation();
  const { value, onCopy, hasCopied } = useClipboard();

  const deviceController = new DeviceController();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const device = {
        name,
        description,
        deviceTypeId: DeviceTypes[selectedDeviceType],
        isActive: false,
      };

      const createdDevice: DeviceDTO = await deviceController.create(device);

      setTopic(createdDevice.topic);
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleFetchTypes = async () => {
    try {
      const response = await deviceController.getAllDeviceTypes();

      const deviceTypes: DeviceTypesDTO[] = response.data.data;

      setDeviceTypes(deviceTypes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchTypes();
    console.log(deviceTypes);
  }, []);

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <HStack w="full">
        <TouchableOpacity onPress={handleNavigateBack} hitSlop={20}>
          <Icon as={<ArrowLeft size={32} />} color={colors.gray[300]} />
        </TouchableOpacity>
      </HStack>
      <Heading color="gray.100" fontSize="2xl" mt={20} mb={6}>
        Adicionar novo dispositivo
      </Heading>
      <Input
        placeholder="Nome do dispositivo"
        mb={4}
        InputLeftElement={
          <Icon as={<PencilSimple color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setName}
      />
      <TextArea
        placeholder="Descrição (O que o dispositivo faz?)"
        mb={4}
        onChangeText={setDescription}
      />
      <Select
        selectedValue={selectedDeviceType}
        placeholder="Selecione o tipo do dispositivo"
        bg="gray.700"
        width="100%"
        h={14}
        size="md"
        borderWidth={0}
        fontFamily="body"
        color="white"
        placeholderTextColor="gray.300"
        marginBottom={24}
        _selectedItem={{
          endIcon: <CheckIcon size={5} />,
        }}
        onValueChange={(itemValue) => setSelectedDeviceType(itemValue)}
      >
        {deviceTypes &&
          deviceTypes.map((deviceType) => (
            <Select.Item
              key={deviceType.id}
              label={deviceType.name}
              value={deviceType.name}
            />
          ))}
      </Select>
      <Button
        title="Adicionar"
        w="full"
        onPress={handleSubmit}
        isLoading={isLoading}
      />
      {topic && (
        <>
          <Heading color="gray.100" fontSize="2xl" mt={12} mb={4}>
            O tópico do seu dispositivo é
          </Heading>
          <Box
            bg={colors.gray[400]}
            rounded={20}
            height={16}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            padding={4}
            gap={6}
          >
            <Text color={colors.gray[200]} fontSize={24}>
              {topic}
            </Text>
            <TouchableOpacity onPress={() => onCopy(topic)}>
              {hasCopied ? (
                <CheckIcon size={5} />
              ) : (
                <Copy size={24} color={colors.gray[300]} />
              )}
            </TouchableOpacity>
          </Box>
        </>
      )}
    </VStack>
  );
}
