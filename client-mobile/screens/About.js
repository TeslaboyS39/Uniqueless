import { Text, View, ImageBackground } from "react-native";

export default function About() {
  return (
    <ImageBackground
      source={{
        uri: "https://truthout.org/wp-content/uploads/2019/08/2019_0804-Iraq-War-1200x782.jpg",
      }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            marginHorizontal: 20,
            color: "white",
          }}
        >
          Welcome to Uniqueless!, the leading catalog of military apparel in
          Southeast Asia. We take pride in offering a diverse range of
          high-quality products tailored to meet the needs of military
          enthusiasts and professionals. Our carefully curated selection
          includes everything from clothing to accessories, designed to deliver
          both functionality and style. Explore our collection and experience
          the unmatched quality and craftsmanship that sets Uniqueless apart.
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            marginHorizontal: 20,
            marginTop: 20,
            color: "white",
          }}
        >
          At Uniqueless, we are dedicated to providing top-notch service and
          ensuring customer satisfaction. With a passion for military apparel,
          we strive to bring you the best products from around the world.
          Whether you're a dedicated collector or an active-duty service member,
          Uniqueless is your go-to destination for authentic, reliable, and
          stylish military gear. Thank you for choosing Uniqueless as your
          preferred source for all things military apparel.
        </Text>
      </View>
    </ImageBackground>
  );
}
