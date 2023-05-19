const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
    }

  type Book {
    bookId: ID
    title: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
    }

  type Query {
    me: User
    searchBooks(searchTerm: String!): [Book]
    getSavedBooks: [Book]
  }

  type Mutation {
    login(email: String!, password: String!): String
    addUser(email: String!, password: String!): Auth
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

module.exports = typeDefs;