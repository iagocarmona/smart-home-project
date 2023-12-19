import React, { memo, useCallback, useState } from "react";
import {
  Box,
  Divider,
  Icon,
  Modal,
  Switch,
  Text,
  View,
  useTheme,
} from "native-base";
import { DeviceController } from "../controllers/device.controller";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DeviceTypeIcons, DeviceTypes } from "../utils/enums";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ProgressCircle from "react-native-progress-circle";

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
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const deviceController = new DeviceController();
  const [percentage, setPercentage] = useState<number>(0);
  const [hoursActive, setHoursActive] = useState<number>(0);
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

  const handleDeleteDevice = async (deviceId: number) => {
    setDeleteConfirmation(false);
    try {
      await deviceController.delete(deviceId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDeviceActiveDay = async () => {
    try {
      const response = await deviceController.getPorcectageDayActive(deviceId);
      const { percentage, hoursActive } = response.data.data;

      setPercentage(percentage);
      setHoursActive(hoursActive);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const intervalId = setInterval(() => {
        handleGetDeviceActiveDay();
      }, 5000);

      return () => clearInterval(intervalId);
    }, [deviceId])
  );

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
          ({topic})
        </Text>
        <MaterialCommunityIcons
          name={getIconByDeviceTypeId(deviceTypeId)}
          size={64}
          color={colors.gray[300]}
        />
      </View>
      <Divider orientation="vertical" bg="gray.400" />
      <View w="60%" justifyContent="center" alignItems="center">
        <View marginRight="25%">
          <Text color="white" mb={4}>
            {hoursActive.toFixed(2)}/24 horas
          </Text>
          <ProgressCircle
            percent={percentage}
            radius={40}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor={colors.gray[700]}
          >
            <Text style={{ fontSize: 18 }} color={colors.gray[100]}>
              {percentage.toFixed(2)}%
            </Text>
          </ProgressCircle>
        </View>
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
      <View position="absolute" right={2} bottom={2}>
        <TouchableOpacity
          onPress={() => setDeleteConfirmation(true)}
          hitSlop={20}
        >
          <Icon
            as={<MaterialCommunityIcons name="trash-can-outline" />}
            color="red.500"
            size={6}
          />
        </TouchableOpacity>
      </View>

      <Modal
        isOpen={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
      >
        <Box background={colors.gray[400]} paddingTop={4} borderRadius={12}>
          <Text fontSize="lg" color="white" paddingX={8}>
            Deseja deletar o dispositivo
          </Text>
          <Box bg={colors.gray[500]} mx={4} rounded={12} marginTop={2}>
            <Text
              fontSize={24}
              color="white"
              textAlign="center"
              fontWeight="bold"
            >
              {title}
            </Text>
          </Box>
          <Box h={0.1} background={colors.gray[300]} mt={6} />
          <Box flexDirection="row" justifyContent="space-evenly" padding={2}>
            <TouchableOpacity
              onPress={() => setDeleteConfirmation(false)}
              hitSlop={20}
            >
              <Text color="white" fontSize={18}>
                Não
              </Text>
            </TouchableOpacity>
            <Box w={0.1} background={colors.gray[300]} />
            <TouchableOpacity
              onPress={() => handleDeleteDevice(deviceId)}
              hitSlop={20}
            >
              <Text color="white" fontSize={18}>
                Sim
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default memo(DeviceCard);
