import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { GET_PRODUCTS_ID } from "../queries";
import { useQuery } from "@apollo/client";

const ProductDetail = ({ route }) => {
  const { productId } = route.params;

  const { loading, data, error } = useQuery(GET_PRODUCTS_ID, {
    variables: {
      productByIdId: productId,
    },
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  console.log(loading, data, error);

  const product = data.productById;

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://c4.wallpaperflare.com/wallpaper/337/635/710/military-soldier-forest-russian-special-force-wallpaper-preview.jpg",
      }}
      style={styles.container}
    >
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.mainImg }}
            style={styles.imageMain}
            opacity={1}
            resizeMode="cover"
          />
          <View style={styles.sideImages}>
            <Image
              source={{ uri: product.mainImg }}
              style={styles.imageSide}
              resizeMode="cover"
            />
            <Image
              source={{ uri: product.mainImg }}
              style={styles.imageSide}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <ScrollView style={styles.descriptionScroll}>
            <Text style={styles.description}>{product.description}</Text>
          </ScrollView>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>Price: {product.price}</Text>
            <Text style={styles.info}>Author: {product.Author.username}</Text>
            <Text style={styles.info}>Category: {product.Category.name}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(85, 113, 83, 0.55)",
    padding: 9,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    opacity: 1,
  },
  imageMain: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginBottom: 11,
    marginTop: 2,
    opacity: 1,
  },
  sideImages: {
    flexDirection: "row",
    justifyContent: "center",
    opacity: 1,
  },
  imageSide: {
    width: 70,
    height: 120,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  textContainer: {
    flex: 1,
    marginTop: 5,
    width: 250,
    height: 333,
    flexShrink: 1,
    backgroundColor: "#A9AF7E",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
    paddingBottom: 3,
  },
  description: {
    fontSize: 16,
  },
  info: {
    fontSize: 16,
  },
  descriptionScroll: {
    height: 100,
  },
  infoContainer: {
    marginTop: 10,
  },
});

export default ProductDetail;
