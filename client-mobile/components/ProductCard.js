import { Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Card style={{ marginBottom: 15, backgroundColor: "lightsteelblue" }}>
      <Card.Cover
        source={{ uri: item.mainImg }}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      <Card.Content style={{ padding: 15 }}>
        <Text style={{ fontSize: 14 }} variant="titleLarge">
          {item.name}
        </Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => {
            navigation.navigate("ProductDetail", { productId: item.id });
          }}
        >
          Detail Product
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default ProductCard;
