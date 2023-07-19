const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis({
  host: "redis-10645.c302.asia-northeast1-1.gce.cloud.redislabs.com",
  password: "Eoh4LXCClVU3dNLvlLU58SZORah4VHzA",
  port: 10645,
});

const BASE_URL_USER = "http://localhost:4001";
const BASE_URL_APP = "http://localhost:4002";

const typeDefs = `#graphql
#Type
type Product {
  id: Int!
  name: String
  slug: String
  description: String
  price: Int
  mainImg: String
  categoryId: Int
  authorId: Int
  createdAt: String
  updatedAt: String
  category: String
  images: [Image]
}


type Image {
  id: Int
  productId: Int
  imgUrl: String
  createdAt: String
  updatedAt: String
}

input formAddProduct {
    name: String,
    description: String,
    categoryId: Int,
    price: Int,
    mainImg: String,
    authorId: String,
    imgUrls: String
}

type addProductResponse {
    name: String,
    description: String,
    categoryId: Int,
    price: Int,
    mainImg: String,
    authorId: String,
    imgUrls: String
}

type deleteProductResponse {
    statusCode: String,
    message: String
}
type updateProductResponse {
    statusCode: String,
    message: String
}




type Query {
  getProduct(id: ID!): Product
  getAllProducts: [Product]
}



type Mutation {
    AddProduct(newInput: formAddProduct) : addProductResponse,
    deleteProduct(id: ID) : deleteProductResponse,
    updateProduct(id: ID, dataProduct: formAddProduct ): updateProductResponse
}
`;

const resolvers = {
  Query: {
    getAllProducts: async () => {
      try {
        let productCache = await redis.get("product:get");

        if (productCache) {
          let productResult = JSON.parse(productCache);
          return productResult;
        }

        const { data } = await axios.get(`${BASE_URL_APP}/pub/products`);
        //    console.log(data, 'isi dari data nih <<<<<');

        let processingData = data?.data.map((product) => {
          product.category = product["Category.name"];
          delete product["Category.name"];
          return product;
        });

        redis.set("product:get", JSON.stringify(processingData));
        return processingData;
      } catch (error) {
        console.log(error);
      }
    },

    getProduct: async (_, { id }) => {
      try {
        console.log("masuk kedetail Product nih");
        const { data } = await axios.get(`${BASE_URL_APP}/pub/detail/${id}`);

        const productDetail = data.data;

        // nambahkan properti 'category' berdasarkan nilai 'Category.name'
        productDetail.category = productDetail["Category.name"];

        // hapus properti 'Category.name'
        delete productDetail["Category.name"];

        // Memformat properti 'imageOptional' menjadi array dengan nama 'images'
        productDetail.images = data.imageOptional;

        // hapus properti 'imageOptional'
        delete productDetail.imageOptional;

        console.log(productDetail, "hasil dari gpt");

        return productDetail;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    AddProduct: async (_, formAddNewProduct) => {
      try {
        console.log(formAddNewProduct, "isi dari formAddNewProduct");
        const { newInput } = formAddNewProduct;
        const { data } = await axios.post(`${BASE_URL_APP}/product`, newInput);
        console.log(data);
        await redis.del("product:get");
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct: async (_, deletedId) => {
      try {
        console.log("masuk kedelete product");
        console.log(deletedId);
        const { id } = deletedId;
        const { data } = await axios.delete(`${BASE_URL_APP}/product/${id}`);
        await redis.del("product:get");
        await redis.del(`product:${id}`);
        console.log(data, "isi data yang keluar setelah melakukan delete");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    updateProduct: async (_, formupdateProduct) => {
      try {
        console.log("masuk ke edit nih");
        console.log(formupdateProduct, "isinya nih <<<<");
        const { id, dataProduct } = formupdateProduct;
        const { data } = await axios.put(
          `${BASE_URL_APP}/product/${id}`,
          dataProduct
        );
        console.log(data, "isi data keluaran hasil update nih <<<<<<<<<<<<<<");
        redis.del("product:get");
        redis.del(`product:${id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
