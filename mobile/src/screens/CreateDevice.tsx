import { useState } from "react";
import {
  VStack,
  Heading,
  Icon,
  useTheme,
  TextArea,
  HStack,
  ArrowBackIcon,
} from "native-base";
import { Alert } from "react-native";

import { Book, PencilSimple } from "phosphor-react-native";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { DeviceController } from "../controllers/device.controller";
import { IDevice } from "../interfaces/device.interface";

export function CreateDevice() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [device, setDevice] = useState<IDevice>({
    name: "",
    description: "",
    isActive: false,
  });
  const { colors } = useTheme();

  const deviceController = new DeviceController();

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const device = {
        name,
        description,
        isActive: false,
      };

      const data: IDevice = await deviceController.create(device);

      if (data) {
        setDevice(data);
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <HStack w="full">
        <Icon as={<ArrowBackIcon color={colors.gray[200]} />} size={24} />
      </HStack>
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
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
        InputLeftElement={
          <Icon as={<Book color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setName}
      />
      <Button
        title="Adicionar"
        w="full"
        onPress={handleSubmit}
        isLoading={isLoading}
      />
    </VStack>
  );
}
