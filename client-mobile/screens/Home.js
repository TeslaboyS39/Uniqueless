import { StyleSheet, Text, View, FlatList } from "react-native";
import Item from "../components/Item";
import Carousel from "../components/Carousel";

const DATA = [
  {
    id: "1",
    title: "Man's Upper",
  },
  {
    id: "2",
    title: "Man's Lower",
  },
  {
    id: "3",
    title: "Women's Upper",
  },
  {
    id: "4",
    title: "Women's Lower",
  },
  {
    id: "5",
    title: "Kid's Upper",
  },
  {
    id: "6",
    title: "Kid's Lower",
  },
  {
    id: "7",
    title: "Misc.",
  },
];

const carouselData = [
  {
    id: 1,
    image:
      "https://cdn11.bigcommerce.com/s-r4y8z95iew/images/stencil/original/carousel/160/vietnam-50th-sale-homepage-banner__95425.jpg?c=2",
  },
  {
    id: 2,
    image: "https://militaryequipment.in/wp-content/uploads/2023/05/Bags-1.jpg",
  },
  {
    id: 3,
    image: "https://i.ytimg.com/vi/NciFVyaMT3k/maxresdefault.jpg",
  },
];

export default function Home({ navigation }) {
  return (
    <View style={[styles.container, { margin: 0, padding: 0 }]}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "sans-serif-light",
            marginLeft: 9,
            paddingTop: 20,
          }}
        >
          Welcome to <Text style={{ color: "maroon" }}>Uniq</Text>less!
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "sans-serif-light",
            marginLeft: 9,
          }}
        >
          The number one military apparel online shop in the South East Asia.
        </Text>
      </View>
      <View style={styles.banner}>
        <View style={{ backgroundColor: "#AEC3AE", flex: 1 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "sans-serif-light",
              fontStyle: "italic",
              paddingBottom: 5,
              textDecorationLine: "underline",
            }}
          >
            CURRENT PROMOS
          </Text>
          <Carousel data={carouselData} />
        </View>
      </View>
      <View style={styles.body}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "sans-serif-light",
            marginLeft: 9,
            paddingTop: 10,
            paddingBottom: 3,
            fontStyle: "italic",
            textDecorationLine: "underline",
          }}
        >
          AVAILABLE CATEGORIES
        </Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => {
            return <Item item={item} />;
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    backgroundColor: "#ADC4CE",
    flex: 1,
    textAlignVertical: "center",
  },
  banner: {
    backgroundColor: "#AEC3AE",
    flex: 2,
    flexDirection: "row",
    padding: 10,
  },
  body: {
    backgroundColor: "#E4E4D0",
    flex: 4,
  },
});
