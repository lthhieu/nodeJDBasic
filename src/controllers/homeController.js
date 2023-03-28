import * as configs from '../configs';
export const homepage = (req, res) => {
    // simple query
    let data = []
    configs.connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            data = results
            console.log("data:" + JSON.stringify(data))
        }
    );

    return res.render('index.ejs');
}