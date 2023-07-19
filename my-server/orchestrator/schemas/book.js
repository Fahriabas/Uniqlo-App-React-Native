

const books = [
    {
        title: "The Awakening",
        author: "Kate Auster",
        // createdAt: new Date()
    },
    {
        title: "City OF Glass",
        author: "Paul  Chopin"
    },
    {
        title: "The Awakening",
        author: "Kate Auster"
    },
    {
        title: "City OF Glass",
        author: "Paul  Chopin"
    },
    {
        title: "The Awakening",
        author: "Kate Auster"
    },
    {
        title: "City OF Glass",
        author: "Paul  Chopin"
    },
]

const typeDefs = `#graphql
  # Komentar di dalam GraphQL diawali dengan tanda hashtag / kres (#).

  # Ini adalah tipe data yang digunakan dalam GraphQL ini
  # Istilahnya adalah "Type Definition"
  type Book {
    title: String
    author: String
  }

  # type "Query" ini bersifat spesial:
  # - Melisting seluruh Query yang bisa digunakan oleh client
  # - Memberitahukan kembalian data yang digunakan untuk tiap Query yang ada
  type Query {
    # Pada query di bawah ini dinyatakan bahwa:
    # - GraphQL akan memiliki sebuah query dengan nama "books"
    # - Kembaliannya berupa array of type Book yang didefinisikan di type Book di atas
    books: [Book]
    
    # Di sini kita mencoba untuk membuat sebuah Query dengan nama "balikinAngka"
    # Kembaliannya berupa suatu angka
    balikinAngka: Int
  }
`;


const resolvers = {
    Query: {
        books: () => books
    }
}

module.exports = {
    typeDefs,
    resolvers
}