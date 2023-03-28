import express from 'express';
import * as configs from './configs';
import * as routes from './routes';
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

configs.viewEngine(app);
routes.initWebRoute(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
