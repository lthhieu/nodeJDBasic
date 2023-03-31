import express from 'express';
const morgan = require('morgan');
import * as configs from './configs';
import * as routes from './routes';
require('dotenv').config();
const app = express();

// xử lý dữ liệu gửi từ client lên server dưới định dạng JSON
app.use(express.json());
// xử lý dữ liệu gửi từ client lên server dưới định dạng x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

//my middleware
app.use((req, res, next) => {
    console.log(req.method);
    next();
});
app.use(morgan('combined'));
configs.viewEngine(app);
routes.initWebRoute(app);
routes.initApiRoute(app);

//middleware 404 page
app.use((req, res) => {
    return res.render('404.ejs');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
