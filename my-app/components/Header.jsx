import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Image
        source={require("./path/to/your/logo.png")}
        style={styles.logo}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "red", // Ubah warna latar belakang menjadi merah
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default Header;
