//authenticationerror adds error handling via graphql
const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    // Query: {
    //   helloWorld: () => {
    //     return 'Hello world!';
    //   }
    // }

    Query: {
        // thoughts: async () => {
        //   return Thought.find().sort({ createdAt: -1 });
        // }

        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('cards')
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
        },
        //get cards - username param is optional
        cards: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Card.find(params).sort({ createdAt: -1 });
        },
        // place this inside of the `Query` nested object right after `cards` 
        card: async (parent, { _id }) => {
            return Card.findOne({ _id });
        },

        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('cards');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
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
            if (context.user) {
              const card = await Card.create({ ...args, username: context.user.username });
          
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { cards: card._id } },
                { new: true } //without this mongo would return the original document rather than the updated one
              );
          
              return card;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        }
    }

};
  
module.exports = resolvers;