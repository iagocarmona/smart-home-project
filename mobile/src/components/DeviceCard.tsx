import React, { memo } from "react";
import { Box, Divider, Icon, Switch, Text, View, useTheme } from "native-base";
import { DeviceController } from "../controllers/device.controller";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DeviceTypeIcons, DeviceTypes } from "../utils/enums";

type Props = {
  title: string;
  topic?: string;
  deviceTypeId: number;
  isActive?: boolean;
  children?: React.ReactNode;
  deviceId: number;
};

const DeviceCard = ({
  title,
  topic,
  deviceTypeId,
  isActive,
  children,
  deviceId,
  ...rest
}: Props) => {
  const deviceController = new DeviceController();

  const { colors } = useTheme();

  const handleActiveDevice = async (deviceId: number) => {
    try {
      await deviceController.active(deviceId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeactivateDevice = async (deviceId: number) => {
    try {
      await deviceController.deactive(deviceId);
    } catch (error) {
      console.log(error);
    }
  };

  const getIconByDeviceTypeId = (deviceTypeId: number) => {
    return DeviceTypeIcons[DeviceTypes[deviceTypeId]];
  };

  return (
    <Box bg="gray.700" rounded="md" py={4} w="100%" flexDirection="row">
      <Box
        position="absolute"
        bottom={2}
        left={2}
        w={3}
        h={3}
        rounded="full"
        bg={isActive ? "green.500" : "red.500"}
      />
      <View w="40%" flex={1} alignItems="center" justifyContent="center">
        <Text color="white" fontSize="lg">
          {title}
        </Text>
        <Text color="gray.300" fontSize={16}>
          tópico: {topic}
        </Text>
        <MaterialCommunityIcons
          name={getIconByDeviceTypeId(deviceTypeId)}
          size={64}
          color={colors.gray[300]}
        />
      </View>
      <Divider orientation="vertical" bg="gray.400" />
      <View w="60%" justifyContent="center" alignItems="center">
        {children}
      </View>
      <Switch
        isChecked={isActive}
        onToggle={() =>
          isActive
            ? handleDeactivateDevice(deviceId)
            : handleActiveDevice(deviceId)
        }
        size="md"
        colorScheme="green"
        position="absolute"
        right={2}
        top={2}
      />
    </Box>
  );
};

export default memo(DeviceCard);
