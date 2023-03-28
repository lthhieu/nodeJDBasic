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