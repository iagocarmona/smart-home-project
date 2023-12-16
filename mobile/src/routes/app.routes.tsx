import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Devices } from "../screens/Devices";
import { RoutesEnum } from "../utils/enums";
import { CreateDevice } from "../screens/CreateDevice";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={RoutesEnum.Devices} component={Devices} />
      <Screen name={RoutesEnum.CreateDevice} component={CreateDevice} />
    </Navigator>
  );
}
