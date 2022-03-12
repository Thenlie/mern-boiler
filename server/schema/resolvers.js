const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find()
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args)
            return user
        },
        login: async (parent, { email, password }, context) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found');
            }
            context.session.userId = user._id
            console.log(context.session);
            return user
        },
        logout: async (parent, args, context) => {
            console.log(context.session)
            const user = await User.findOne({ _id: context.session.userId});
            if (!user) {
                throw new AuthenticationError('No user found');
            }
            context.session.destroy();
            return user
        }
    }
}

module.exports = resolvers;