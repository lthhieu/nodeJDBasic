import express from 'express';
import * as configs from './configs';
import * as routes from './routes';
require('dotenv').config();
const app = express();
// xử lý dữ liệu gửi từ client lên server dưới định dạng JSON
app.use(express.json());
// xử lý dữ liệu gửi từ client lên server dưới định dạng x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

configs.viewEngine(app);
routes.initWebRoute(app);
routes.initApiRoute(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
