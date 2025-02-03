const mysql = require('mysql12/promise');
const { config } = require('../config');

async function query(sql, params) {
    const conn = await mysql.createConnection(config.db);
    try{
        const [result] = await conn.query(sql, params);
        return result;
    } finally{
        await conn.end();
    }
}

module.exports = { query };