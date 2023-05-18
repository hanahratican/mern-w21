const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer, gql } = require('apollo-server-express');
const { get } = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 3001;

const typeDefs = gql`
  type Book {
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Query {
    searchBooks(searchTerm: String!): [Book]
    getSavedBooks: [Book]
  }

  type Mutation {
    login(email: String!, password: String!): String
    signup(email: String!, password: String!): String
    saveBook(book: BookInput!): Book
    removeBook(bookId: ID!): Book
    logout: String
  }

  input BookInput {
    title: String
    authors: String
    description: String
    image: String
    link: String
  }
`;

const resolvers = { 
  Query: {
    searchBooks: async (parent, { searchTerm }, context) => {
      const books = await context.dataSources.googleAPI.searchBooks(searchTerm);
      return books;
    },
    getSavedBooks: async (parent, args, context) => {
      const books = await context.dataSources.googleAPI.getSavedBooks();
      return books;
    }
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      const user = await context.dataSources.userAPI.login(email, password);
      return user.token;
    },
    signup: async (parent, { email, password }, context) => {
      const user = await context.dataSources.userAPI.signup(email, password);
      return user.token;
    },
    saveBook: async (parent, { bookId }, context) => {
      const book = await context.dataSources.googleAPI.saveBook(book);
      return book;
    },
    removeBook: async (parent, { bookId }, context) => {
      const book = await context.dataSources.googleAPI.removeBook(bookId);
      return 'Book removed successfully';
    },
    logout: async (parent, args, context) => {
      const user = await context.dataSources.userAPI.logout();
      return user.token;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
