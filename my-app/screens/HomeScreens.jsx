import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph, ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";
// import Header from "../components/Header";

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      name
      slug
      description
      price
      mainImg
      categoryId
      authorId
      createdAt
      updatedAt
      category
      images {
        id
        productId
        imgUrl
        createdAt
        updatedAt
      }
    }
  }
`
const Home = () => {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  console.log(data, 'isi dari data nih');
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#00000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Error loading movies.</Text>
      </View>
    );
  }
  const goToDetail = (productId) => {
    // Logika navigasi ke halaman detail berdasarkan ID produk
    // Implementasikan sesuai dengan router atau navigasi yang Anda gunakan
    console.log("Go to Detail for Product ID:", { productId });
    navigation.navigate("Detail", { productId });
  };



  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        {/* <Header/> */}
        {/* <Text>Selamat datang di halaman Home hehe</Text> */}
        {data?.getAllProducts?.map((item) => (
          <Card key={item.id}>
            <Card.Cover source={{ uri: item.mainImg }} />
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>Rp.{item.price}</Paragraph>
            </Card.Content>
            <Card.Actions>
            <TouchableOpacity
                style={{
                  backgroundColor: "#007bff",
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={() => goToDetail(item.id)}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  Go to Detail
                </Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
