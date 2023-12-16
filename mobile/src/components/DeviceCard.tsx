import React, { memo } from "react";
import { Box, Divider, Icon, Switch, Text, View } from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { DeviceController } from "../controllers/device.controller";

type Props = {
  title: string;
  deviceTypeId: number;
  isActive?: boolean;
  children?: React.ReactNode;
  deviceId: number;
};

const iconsFA = ["lightbulb-o", "coffee"];

const DeviceCard = ({
  title,
  deviceTypeId,
  isActive,
  children,
  deviceId,
  ...rest
}: Props) => {
  const deviceController = new DeviceController();

  const handleActiveDevice = async (deviceId: number) => {
    try {
      const data = await deviceController.active(deviceId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeactivateDevice = async (deviceId: number) => {
    try {
      const data = await deviceController.deactive(deviceId);
    } catch (error) {
      console.log(error);
    }
  };

  const getIconByDeviceTypeId = async (deviceTypeId: number) => {};

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
        <Icon
          as={iconsFA.includes(icon) ? FontAwesome : Ionicons}
          name={icon}
          color="white"
          size={16}
          mt={2}
          marginLeft={icon === "lightbulb-o" ? 6 : 0}
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
            : handleDeactivateDevice(deviceId)
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
