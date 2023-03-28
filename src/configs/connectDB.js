// get the client
const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodeJSBasic'
});
