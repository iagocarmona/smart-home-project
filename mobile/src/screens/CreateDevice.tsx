import { useState } from "react";
import { VStack, Heading, Icon, useTheme, HStack, Select } from "native-base";
import { Alert, TouchableOpacity } from "react-native";

import { ArrowLeft, PencilSimple } from "phosphor-react-native";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { DeviceController } from "../controllers/device.controller";
import { IDevice } from "../interfaces/device.interface";
import { TextArea } from "../components/TextAreaInput";
import { useNavigation } from "@react-navigation/native";
import { RoutesEnum } from "../utils/enums";
import { DeviceDTO } from "../DTO/device.dto";

export function CreateDevice() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [device, setDevice] = useState<IDevice>({
    name: "",
    description: "",
    deviceTypeId: 1,
    isActive: false,
  });

  const { colors } = useTheme();
  const navigation = useNavigation();

  const deviceController = new DeviceController();

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const device = {
        name,
        description,
        deviceTypeId: 1,
        isActive: false,
      };

      const data: DeviceDTO = await deviceController.create(device);

      if (data) {
        setDevice(data);
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <HStack w="full">
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon as={<ArrowLeft size={32} />} color={colors.gray[300]} />
        </TouchableOpacity>
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
        onChangeText={setDescription}
      />
      <Select />
      <Button
        title="Adicionar"
        w="full"
        onPress={handleSubmit}
        isLoading={isLoading}
      />
    </VStack>
  );
}
