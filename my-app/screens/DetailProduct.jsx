import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';

const getProductDetail = gql`
  query GetProduct($getProductId: ID!) {
    getProduct(id: $getProductId) {
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
`;

const Detail = ({ route }) => {
  const { params } = route;
  const { productId } = params;

  const { loading, error, data } = useQuery(getProductDetail, {
    variables: { getProductId: productId },
  });

  console.log(data, 'isi dari detail nih');
  const product = data?.getProduct;

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#00000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Error loading movies.</Text>
      </View>
    );
  }

  return (
    <View>
      <ScrollView horizontal>
        <View style={{ flexDirection: 'row' }}>
          {product.images.map((image) => (
            <TouchableOpacity key={image.id} onPress={() => console.log('Image selected')}>
              <Image
                source={{ uri: image.imgUrl }}
                style={{ width: 100, height: 100, marginHorizontal: 10 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Card>
        <ScrollView horizontal>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => console.log('Main image selected')}>
              <Image
                source={{ uri: product.mainImg }}
                style={{ width: 400, height: 500, marginHorizontal: 10 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Card.Content>
          <Title>{product.name}</Title>
          <Paragraph>Harga: {product.price}</Paragraph>
          <Text>{product.description}</Text>
          {/* Tambahkan informasi detail lainnya sesuai kebutuhan */}
        </Card.Content>
      </Card>
    </View>
  );
};

export default Detail;
