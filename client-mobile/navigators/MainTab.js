import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import Home from "../screens/Home";
import About from "../screens/About";
import MainStack from "./MainStack";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => {
            return <Fontisto name="shopping-store" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="Products"
        component={MainStack}
        options={{
          headerShown: false,
          title: "Our Products",
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="md-shirt-sharp" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          title: "About Us",
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="md-people" size={24} color="black" />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
