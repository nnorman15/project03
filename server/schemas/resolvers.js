//authenticationerror adds error handling via graphql
const { AuthenticationError } = require('apollo-server-express');
const { User, Card } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('cards')
      
          return userData;
        }
      
        throw new AuthenticationError('Not logged in');
    },

    //get cards - by email AND subject
    cards: async (parent, { email, cardSubject }) => {
        const params = {email, cardSubject};
        //return Card.find(params).sort({ createdAt: -1 });
        return Card.find(params).sort({ cardTitle: 1 });
    },

    //get card by _id
    card: async (parent, { _id }) => {
        return Card.findOne({ _id });
    },

    // get all users
    users: async () => {
        return User.find()
        .select('-__v -password')
        .populate('cards');
    },

    // get a user by email
    user: async (parent, { email }) => {
        return User.findOne({ email })
        .select('-__v -password')
        .populate('cards');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
      
        return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const token = signToken(user);
        return { token, user };
    },
    addCard: async (parent, args, context) => {

      // if (context.user) {
      //   const updatedUser = await User.findByIdAndUpdate(
      //     { _id: context.user._id },
      //     { $push: { savedBooks: bookData } },
      //     { new: true }
      //   );

      //   return updatedUser;
      // }

      if (context.user) {
        const card = await Card.create({ ...args, email: context.user.email });
    
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { cards: card._id } },
          { new: true } //without this mongo would return the original document rather than the updated one
        );
    
        return card;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    editCard: async (parent, args, context) => {
      if (context.user) {
        return await Card.findByIdAndUpdate({ _id: args._id},{cardSubject: args.cardSubject, cardTitle: args.cardTitle,cardBody: args.cardBody });
    
        // await User.findByIdAndUpdate(
        //   { _id: context.user._id },
        //   { $push: { cards: card._id } },
        //   { new: true } //without this mongo would return the original document rather than the updated one
        // );
    
        // return card;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteCard: async (parent, args , context) => {
      if (context.user) {
        return await Card.findByIdAndRemove({ _id: args._id});
      }

      // if (context.user) {
      //   const updatedUser = await User.findOneAndRemove(
      //     { _id: context.user._id },
      //     { $pull: { cards: args._id } },
      //     { new: true }
      //   );

      //   return updatedUser;
      // }
    
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};
  
module.exports = resolvers;