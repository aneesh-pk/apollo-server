const USER_LOGIN_ERROR = 'Username or password invalid';
const USER_LOGIN_SUCCESS = 'User logined successfully';
const {Users} = require("../Users");

const login = (username, password) => {
    return Users.query({where: {username, password}})
        .fetch()
        .then(user => user.toJSON())
        .then(userJson => {
            return {
                success: true,
                info: USER_LOGIN_SUCCESS,
                user: userJson
            }
        })
        .catch(err => {
            console.error('Error getting user: ', err);
            return (
                {success: false, info: USER_LOGIN_ERROR, user: {}}
            );
        });

};



const createUser = (username, password, email) => {
    return Users.query({where: {username}})
        .count()
        .then(count => {
            return {
                success: true,
                info: USER_LOGIN_SUCCESS,
                count: count
            }
        })
        .catch(err => {
            console.error('Error getting user: ', err);
            return (
                {success: false, info: USER_LOGIN_ERROR, user: {}}
            );
        });

};


module.exports.login = login;
module.exports.createUser = createUser;