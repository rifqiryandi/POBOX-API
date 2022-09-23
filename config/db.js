const knex = require('knex')({
    client: 'pg',
    version: '14',
    connection: {
        host: '10.24.11.123',
        port: 5432,
        user: 'newpobox',
        password: 'poboxnew',
        database: 'pobox'
    }
});

// const main = async() => {
//     await knex.raw('select 1+1').then((result) => {
//         console.log(result);
//     }).catch((err) => {
//         console.log(err);
//     });

// }

// main();
module.exports = { knex }