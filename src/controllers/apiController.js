import * as configs from '../configs';
export const apiGetAllUsers = async (req, res) => {
    // simple query
    let [rows, fields] = await configs.pool.execute('SELECT * FROM `users`');
    return res.status(200).json({
        mess: "ok",
        data: rows
    })
}
export const apiCreateNewUsers = async (req, res) => {
    // simple query
    let { fName, lName, email, address } = req.body;
    if (!(fName && lName && email && address)) {
        return res.status(200).json({
            mess: "miss body"
        })
    } else {
        let sql = `INSERT INTO users (fName, lName, email, address) VALUES (?, ?, ?, ?)`;
        let values = [fName, lName, email, address];
        await configs.pool.execute(sql, values);
        return res.status(200).json({
            mess: "ok"
        })
    }
}
export const apiUpdateUsers = async (req, res) => {
    let { id, fName, lName, email, address } = req.body;
    if (!(id && fName && lName && email && address)) {
        return res.status(200).json({
            mess: "miss body"
        })
    } else {
        let sql = `UPDATE users SET fName = ?, lName = ?, email = ?, address = ? WHERE id = ?;`;
        let values = [fName, lName, email, address, id];
        await configs.pool.execute(sql, values);
        return res.status(200).json({
            mess: "ok"
        })
    }
}
export const apiDeleteUsers = async (req, res) => {
    let id = req.body.id;
    if (!(id)) {
        return res.status(200).json({
            mess: "miss id"
        })
    } else {
        await configs.pool.execute(`DELETE FROM users WHERE id = ?`, [id]);
        return res.status(200).json({
            mess: "ok"
        })
    }
}