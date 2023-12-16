import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  FlatList,
  HStack,
  Heading,
  Icon,
  VStack,
  useTheme,
} from "native-base";
import { PlusCircle } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { RoutesEnum } from "../utils/enums";
import { TouchableOpacity } from "react-native";
import { DeviceController } from "../controllers/device.controller";
import { DeviceDTO } from "../DTO/device.dto";
import DeviceCard from "../components/DeviceCard";

export const Devices = () => {
  const [devices, setDevices] = useState<DeviceDTO[]>();

  const { colors } = useTheme();
  const navigation = useNavigation();

  const deviceController = new DeviceController();

  const handleNavigateCreateDevices = () => {
    navigation.navigate(RoutesEnum.CreateDevice);
  };

  const handleFetchDevices = useCallback(async () => {
    try {
      const data: DeviceDTO[] = await deviceController.getAll();

      console.log("DATAAAA ", data);

      if (data) {
        setDevices(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setDevices]);

  useEffect(() => {
    handleFetchDevices();
  }, []);

  return (
    <VStack flex={1} pb={6} pt={60} pl={6} pr={6} bg="gray.600">
      <HStack
        w="full"
        h={10}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading color="white" fontSize="4xl">
          Dispositivos
        </Heading>
        <TouchableOpacity onPress={handleNavigateCreateDevices}>
          <Icon as={<PlusCircle color={colors.green[300]} size={32} />} />
        </TouchableOpacity>
      </HStack>
      <FlatList
        data={devices}
        mt={4}
        ItemSeparatorComponent={() => <Box h={2} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DeviceCard
            key={item.id}
            title={item.name}
            deviceTypeId={item.deviceTypeId}
            isActive={item.isActive}
            deviceId={item.id}
          />
        )}
      />
    </VStack>
  );
};
