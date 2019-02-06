const { User } = require("../users/User");
const { UserFile } = require("./UserFile");
const { uploadFile, deleteFile } = require("./mutations");
const { FBlob } = require("../files/mongo");


const formatResponse = (userFiles) => {
    let userFilesWithBlob = [];
    return new Promise((resolve) => {
        if(userFiles.length > 0){
            userFiles.map((userFile, index) => {
                FBlob.findOne({ id: userFile.id }).then(fBlob => {
                    userFile.blob = fBlob.file;
                    userFilesWithBlob.push(userFile);
                    if (index === (userFiles.length - 1))
                        resolve(userFilesWithBlob);
                });
            });
        }else{
            resolve([]);
        }
        
    })
}

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
                .then((userFiles) => {
                    return formatResponse(userFiles);
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
    Mutation: {
        upload_file: (gql, { file }, context) => uploadFile(file, context.user).then(response => {
            return response;
        }),
        delete_file: (gql, { file }, context) => deleteFile(file, context.user).then(response => {
            return response;
        })
    }
};

module.exports = {
    resolvers
}