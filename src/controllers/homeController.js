import * as configs from '../configs';
const _ = require('lodash');
export const homepage = async (req, res) => {
    // simple query
    let [rows, fields] = await configs.pool.execute('SELECT * FROM `users`');
    return res.render('index.ejs', { data: rows });
}
export const detailUser = async (req, res) => {
    let id = req.params.id
    let [rows, fields] = await configs.pool.execute('SELECT * FROM `users` WHERE `id`= ?', [id]);
    if (_.isEmpty(rows)) {
        return res.send("ID không tồn tại");
    }
    else {
        return res.send(JSON.stringify(rows));
    }
}
export const createNewUser = async (req, res) => {
    let { fName, lName, email, address } = req.body;
    let sql = `INSERT INTO users (fName, lName, email, address) VALUES (?, ?, ?, ?)`;
    let values = [fName, lName, email, address];
    await configs.pool.execute(sql, values);
    return res.redirect('/');
}
export const deleteUser = async (req, res) => {
    let id = req.body.id;
    await configs.pool.execute(`DELETE FROM users WHERE id = ?`, [id]);
    return res.redirect('/');
}
export const updateUser = async (req, res) => {
    let id = req.params.id
    let [rows, fields] = await configs.pool.execute('SELECT * FROM `users` WHERE `id`= ?', [id]);
    if (_.isEmpty(rows)) {
        return res.send("ID không tồn tại");
    }
    else {
        let { id, fName, lName, email, address } = rows[0];
        return res.render('update-user.ejs', { id, fName, lName, email, address });
    }
}
export const postUpdateUser = async (req, res) => {
    let { id, fName, lName, email, address } = req.body;
    let sql = `UPDATE users SET fName = ?, lName = ?, email = ?, address = ? WHERE id = ?;`;
    let values = [fName, lName, email, address, id];
    await configs.pool.execute(sql, values);
    return res.redirect('/');
}