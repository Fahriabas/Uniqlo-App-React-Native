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
type User{
_id: ID!
username: String,
address: String,
email: String,
password: String,
phoneNumber: String,

}

input inputData {
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String
}

type registerResponse {
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String
  }

type deleteUserResponse {
    statusCode: String,
    message: String
}

#Type Query and mutation here
type Query {
    users: [User],
    userDetail(_id: ID!): User  
  }

type Mutation {
    register(newInput: inputData) : registerResponse,
    deleteUser(_id: ID!): deleteUserResponse
}
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        let userCache = await redis.get("users:get");

        if (userCache) {
          let usersResult = JSON.parse(userCache);
          console.log(usersResult, "isi dari user result nih ><<<<<");
          return usersResult.data;
        }
        const { data } = await axios.get(`${BASE_URL_USER}/users`);
        console.log(data.data, "isi dari data nih<<<<<<");

        redis.set("users:get", JSON.stringify(data));
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },

    userDetail: async (_, { _id }) => {
      try {
        let detailUserCache = await redis.get(`users:${_id}`);
        if (detailUserCache) {
          const userResult = JSON.parse(detailUserCache);
          return userResult.user;
        }
        console.log(_id, "isi dri id nih ");
        const { data } = await axios.get(`${BASE_URL_USER}/users/${_id}`);
        console.log(data, "isi dari data nih <<<<");
        redis.set(`users:${_id}`, JSON.stringify(data));
        return data.user;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    register: async (_, formRegisterUser) => {
      try {
        console.log(formRegisterUser, "isi dari formRegisterUser");
        const { newInput } = formRegisterUser;
        console.log(newInput, "isi dari newInput");

        const { data } = await axios.post(
          `${BASE_URL_USER}/register`,
          newInput
        );

        console.log(data, "isi dari data keluaran axios");
        redis.del("users:get");
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    deleteUser: async (_, deletedId) => {
      try {
        console.log(deletedId, "isi dari parameter");
        console.log("masuk kedelete user by id nih");
        const { _id } = deletedId;
        console.log(_id, "isinya nih");
        const { data } = await axios.delete(`${BASE_URL_USER}/users/${_id}`);

        redis.del(`users:${_id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
