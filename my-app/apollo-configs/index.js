// const { ApolloClient, InMemoryCache, ApolloProvider, gql } = require('@apollo/client');
// // import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// const client = new ApolloClient({
//     uri: 'https://a978-27-50-29-117.ngrok-free.app',
//     cache: new InMemoryCache(),
// });


// // controh fetching data yang sudah ada di ngrok
// client
//   .query({
//     query: gql`
//       query GetAllProducts {
//         getAllProducts {
//           id
//           name
//           slug
//           description
//           price
//           mainImg
//           categoryId
//           authorId
//           createdAt
//           updatedAt
//           category
//           images {
//             id
//             productId
//             imgUrl
//             createdAt
//             updatedAt
//           }
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result.data));


// //   export default client