const { UserFile } = require("./UserFile");
const { User } = require("../users/User");
const { FBlob } = require("../files/mongo");
const { validateUploadSchema } = require("./validations");

const fs = require('fs');

const uploadFile = async (file, user) => {
    var requestHasError = await validateUploadSchema(file);
    if (!requestHasError) {
        return new UserFile({ user_id: user.id, name: file.name, mime: file.mime })
            .save()
            .then(userFile => userFile.toJSON())
            .then((userFile) => {
                return new FBlob({ id: userFile.id, file: file.blob }).save();
            })
            .then((fBlob) => {
                return {
                    success: true,
                    info: "Successfully uploaded file",
                }
            }).catch(err => {
                return (
                    {
                        success: false,
                        info: "Could not upload file",
                    }
                );
            })
    }
    return {
        success: false,
        token: "",
        info: requestHasError.details[0].message,
        user: {}
    }
}

const deleteFile = async (file, user) => {
    return UserFile.where({ id: file.id, user_id: user.id })
        .destroy()
        .then(() => {
            return FBlob({ id: file.id }).remove();
        })
        .then(() => {
            return {
                success: true,
                info: "Successfully deleted file",
            }
        }).catch(err => {
            console.log(err);
            return (
                {
                    success: false,
                    info: "Could not delete file",
                }
            );
        })
}





module.exports = {
    uploadFile,
    deleteFile
};