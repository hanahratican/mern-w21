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
      login: async (_, { email, password }, context) => {
        const user = await context.dataSources.userAPI.login(email, password);
        return user.token;
      },
      signup: async (_, { email, password }, context) => {
        const user = await context.dataSources.userAPI.signup(email, password);
        return user.token;
      },
      saveBook: async (_, { book }, context) => {
        const book = await context.dataSources.googleAPI.saveBook(book);
        return savedBook;
      },
      removeBook: async (_, { bookId }, context) => {
        const book = await context.dataSources.googleAPI.removeBook(bookId);
        return 'Book removed successfully';
      },
      logout: async (_, args, context) => {
        const user = await context.dataSources.userAPI.logout();
        return user.token;
      }
    }
  };

  module.exports = resolvers;