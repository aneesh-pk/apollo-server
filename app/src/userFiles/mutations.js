const { UserFile } = require("./UserFile");
const { User } = require("../users/User");

const fs = require('fs');


const uploadFile = async (file, user) => {
    return new UserFile({ user_id: user.id, name: file.name, mime: file.mime })
        .save()
        .then((user) => {
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





module.exports = {
    uploadFile
};