import React from "react";
import { Box, FlatList, HStack, Heading, VStack } from "native-base";
import DeviceCard from "../components/DeviceCard";

const devices = [
  {
    id: 1,
    title: "Lâmpada",
    icon: "lightbulb-o",
    isActive: true,
  },
  {
    id: 2,
    title: "Ar-condicionado",
    icon: "snow-outline",
    isActive: true,
  },
  {
    id: 3,
    title: "Televisão",
    icon: "tv-outline",
    isActive: false,
  },
  {
    id: 4,
    title: "Cafeteira",
    icon: "coffee",
    isActive: false,
  },
  {
    id: 6,
    title: "Computador",
    icon: "desktop-outline",
    isActive: true,
  },
];

export const Home = () => {
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
            title={item.title}
            icon={item.icon}
            isActive={item.isActive}
            deviceId={item.id}
          />
        )}
      />
    </VStack>
  );
};
