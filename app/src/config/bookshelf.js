const dbConfig = {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'aneesh-phases',
        password: 'aneesh-phases',
        database: 'aneesh-phases',
        port: "5432",
        charset: 'utf8'
    }
};
let knex = require('knex')(dbConfig);
module.exports = require('bookshelf')(knex);