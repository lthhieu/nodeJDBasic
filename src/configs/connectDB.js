// get the client
const mysql = require('mysql2');

// create the connection to database
export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodeJSBasic'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database successfully!');
});