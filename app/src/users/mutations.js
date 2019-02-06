const USER_LOGIN_SUCCESS = 'User logined successfully';
const USER_CREATE_SUCCESS = 'User successfully registered';
const USER_UPDATE_SUCCESS = 'User data successfully updated';
const USER_DELETE_SUCCESS = 'User successfully deleted';

const USER_LOGIN_ERROR = 'Username or password invalid';
const USER_CREATE_ERROR = 'User already exists';
const USER_UPDATE_ERROR = 'User data not updated';
const USER_DELETE_ERROR = 'User not deleted';

const { User } = require("./User");
const { UserFile } = require("../userFiles/UserFile");
const { FBlob } = require("../files/mongo");
const { validateLoginSchema, validateUserRegisterSchema, validateUserUpdateSchema } = require("./validations");
const { encryptPassword, comparePassword } = require("../utils/misc");
const jwt = require('jsonwebtoken');
const fs = require('fs');


const login = async (user) => {
    var requestHasError = await validateLoginSchema(user);
    if (!requestHasError) {
        var hash = await encryptPassword(user.password);
        return User.query({ where: { "email": user.email } })
            .fetch()
            .then(db_user => db_user.toJSON())
            .then(async (db_user) => {
                var password_verified = await comparePassword(user.password, db_user.password);
                if (password_verified)
                    return db_user;
                else
                    throw ({ success: false })
            })
            .then(db_user => {
                return {
                    success: true,
                    token: jwt.sign(db_user, fs.readFileSync('private.key'), { expiresIn: '10h' }),
                    info: USER_LOGIN_SUCCESS,
                    user: db_user
                }
            })
            .catch(err => {
                return {
                    success: false,
                    token: "",
                    info: USER_LOGIN_ERROR,
                    user: {}
                }
            })
    }
    return {
        success: false,
        token: "",
        info: requestHasError.details[0].message,
        user: {}
    }
}


const createUser = async (user) => {
    var requestHasError = await validateUserRegisterSchema(user);
    if (!requestHasError) {
        var hash = await encryptPassword(user.password);
        return new User({ name: user.name, password: hash, email: user.email })
            .save()
            .then((user) => {
                return {
                    success: true,
                    info: USER_CREATE_SUCCESS,
                    user: user
                }
            }).catch(err => {
                return (
                    {
                        success: false,
                        info: USER_CREATE_ERROR,
                        user: {}
                    }
                );
            })
    }
    return ({
        success: false,
        info: requestHasError.details[0].message,
        user: {}
    });
};

const updateUser = async (db_user, input) => {
    var requestHasError = await validateUserUpdateSchema(input);
    if (!requestHasError) {
        return User.where({ id: db_user.id })
            .save(input, { method: 'update', patch: true })
            .then(user => user.refresh())
            .then(user => user.toJSON())
            .then((user) => {
                return {
                    success: true,
                    info: USER_UPDATE_SUCCESS,
                    user: user
                }
            }).catch(err => {
                return (
                    {
                        success: false,
                        info: USER_UPDATE_ERROR,
                        user: {}
                    }
                );
            })
    }
    return ({
        success: false,
        info: requestHasError.details[0].message,
        user: {}
    });
};

const userFileIdList = (userFiles) => {
    let idList = [];
    return new Promise((resolve) => {
        if (userFiles.length > 0) {
            userFiles.map((userFile, index) => {
                idList.push(userFile.id);
                if (index === (userFiles.length - 1))
                    resolve(idList);
            });

        } else
            resolve([]);
    })
}

const deleteUserFiles = (db_user) => {
    return UserFile.where({ user_id: db_user.id }).fetchAll()
        .then((userFiles) => userFiles.toJSON())
        .then((userFiles) => userFileIdList(userFiles))
        .then(filesIdList => {
            return FBlob.deleteMany({ id: { $in: filesIdList } })
        })
        .then(() => {
            return UserFile.where({ user_id: db_user.id }).destroy();
        }).catch(err => {
            switch (err.message) {
                case "No Rows Deleted":
                    return true;
                default:
                    throw err;
            }
        });
}

const deleteUser = async (db_user) => {
    deleteUserFiles(db_user)
        .then(() => {
            return User.where({ id: db_user.id }).destroy()
        })
        .then(() => {
            return {
                success: true,
                info: USER_DELETE_SUCCESS
            }
        }).catch(err => {
            return (
                {
                    success: false,
                    info: USER_DELETE_ERROR
                }
            )
        });

};


module.exports = {
    login,
    createUser,
    updateUser,
    deleteUser
};