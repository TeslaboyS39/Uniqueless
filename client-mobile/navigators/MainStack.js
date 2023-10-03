import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/Products";
import ProductDetail from "../screens/ProductDetail";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OurProducts"
        component={Products}
        options={{
          title: "Our Products",
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ title: "Product Detail" }}
      />
    </Stack.Navigator>
  );
}
