import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const Item = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProductDetail", { productId: item.id });
      }}
    >
      <View
        style={{
          backgroundColor: "#94A684",
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          flexDirection: "row",
          gap: 15,
          justifyContent: "space-between",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Image
          style={{ height: 50, width: 50, borderRadius: 10 }}
          source={{
            uri: "https://img.freepik.com/free-vector/skull-modern-military-helmet_225004-4.jpg?w=2000",
          }}
        />
        <Text style={{ fontSize: 25, fontFamily: "sans-serif-condensed" }}>
          {item.title}
        </Text>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
          onPress={() => {
            navigation.navigate("ProductDetail", { productId: item.id });
          }}
        >
          <Feather name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
