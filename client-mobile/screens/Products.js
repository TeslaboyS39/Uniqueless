import { View, ScrollView, ActivityIndicator } from "react-native";
import { SearchBar } from "react-native-elements";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { GET_PRODUCTS } from "../queries";
import { useQuery } from "@apollo/client";

export default function Products() {
  const [search, setSearch] = useState("");

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const products = data.allProducts;
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#E4E4D0",
          paddingBottom: 25,
        }}
      >
        <SearchBar
          placeholder="Search ..."
          onChangeText={(text) => setSearch(text)}
          value={search}
          style={{ borderRadius: 10 }}
        />
      </View>
      <View style={{ flex: 9, backgroundColor: "#E4E4D0", flexWrap: "wrap" }}>
        <ScrollView
          contentContainerStyle={{
            marginTop: 15,
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 5,
            justifyContent: "space-evenly",
          }}
        >
          {products.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              style={{ marginBottom: 50 }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
