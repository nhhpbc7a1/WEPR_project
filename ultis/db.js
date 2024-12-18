import knexObj from "knex"

const knex = knexObj({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'tobey261204',
        database: 'WEPR_news'
    },
    pool: {min: 0, max: 7}
});

export default knex;