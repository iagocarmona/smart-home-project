import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Devices } from "../screens/Devices";
import { Routes } from "../utils/enums";
import { CreateDevice } from "../screens/CreateDevice";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={Routes.Devices} component={CreateDevice} />
      {/* <Screen name={Routes.CreateDevice} component={SignIn} /> */}
    </Navigator>
  );
}
