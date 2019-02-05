const { User } = require("../users/User");
const { UserFile } = require("./UserFile");
const {uploadFile} = require("./mutations");

const resolvers = {
    Query: {
        user_files: (parent, args, context, info) => {
            return User.where({ "id": context.user.id })
                .fetch()
                .then(user => {
                    return UserFile.where({ "user_id": user.id }).fetchAll()
                })
                .then(userFiles => {
                    return userFiles.toJSON()
                })
                .then(userFiles => {
                    return {
                        success: true,
                        info: "Files list fetched",
                        files: userFiles
                    }
                })
                .catch(err => {
                    return {
                        success: false,
                        info: "Error",
                        files: []
                    }
                })
        },
    },
    Mutation:{
        upload_file: (gql, { file }, context) => uploadFile(file, context.user).then(response => {
            return response;
        })
    }
};

module.exports = {
    resolvers
}