const { User } = require("./User");
const { login, createUser, updateUser } = require("./mutations");

const resolvers = {
    Query: {
        user: (parent, args, context, info) => {
            return User.where({ "id": context.user.id })
                .fetch()
                .then(user => user.toJSON());
        },
    },
    Mutation: {
        login: (gql, { user }) => login(user).then(response => {
            return response;
        }),
        create_user: (gql, { user }) => createUser(user).then(response => {
            return response;
        }),
        update_user: (gql, { user }, context, info) => updateUser(context.user, user).then(response => {
            return response;
        }),

    },
};

module.exports = {
    resolvers
}