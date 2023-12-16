import React, { useEffect, useState } from "react";
import { Box, FlatList, HStack, Heading, VStack } from "native-base";
import DeviceCard from "../components/DeviceCard";
import { DeviceDTO } from "../DTO/device.dto";

const devicesMock: DeviceDTO[] = [
  {
    id: 1,
    name: "Lâmpada",
    description: "Lâmpada do quarto",
    // icon: "lightbulb-o",
    isActive: true,
  },
  {
    id: 2,
    name: "Ar-condicionado",
    description: "Ar-condicionado do quarto",
    // icon: "snow-outline",
    isActive: true,
  },
  {
    id: 3,
    name: "Televisão",
    description: "Televisão do quarto",
    // icon: "tv-outline",
    isActive: false,
  },
  {
    id: 4,
    name: "Cafeteira",
    description: "Cafeteira do quarto",
    // icon: "coffee",
    isActive: false,
  },
  {
    id: 6,
    name: "Computador",
    description: "Computador do quarto",
    // icon: "desktop-outline",
    isActive: true,
  },
];

export const Devices = () => {
  const [devices, setDevices] = useState<DeviceDTO[]>();

  useEffect(() => {
    setDevices(devicesMock);
  }, []);

  return (
    <VStack flex={1} pb={6} pt={60} pl={6} pr={6} bg="gray.700">
      <HStack
        w="full"
        h={10}
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Heading color="white" fontSize="4xl">
          Dispositivos
        </Heading>
      </HStack>
      <FlatList
        data={devices}
        mt={4}
        ItemSeparatorComponent={() => <Box h={2} />}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DeviceCard
            key={item.id}
            title={item.name}
            icon="desktop-outline"
            isActive={item.isActive}
            deviceId={item.id}
          />
        )}
      />
    </VStack>
  );
};
