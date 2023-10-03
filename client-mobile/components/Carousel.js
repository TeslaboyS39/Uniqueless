import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

const { width } = Dimensions.get("window");

const Carousel = ({ data }) => {
  return (
    <FlatList
      contentContainerStyle={styles.carouselContainer}
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <View style={[styles.carouselItem, index !== 0 && { marginLeft: -30 }]}>
          <ImageBackground
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItem: {
    width,
    height: 200,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default Carousel;
