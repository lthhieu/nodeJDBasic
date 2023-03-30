const express = require('express');
import * as apiController from '../controllers/apiController'
let router = express.Router();

export const initApiRoute = (app) => {
    router.get('/get-all-users', apiController.apiGetAllUsers);
    router.post('/create-new-user', apiController.apiCreateNewUsers);
    router.put('/update-user', apiController.apiUpdateUsers);
    router.delete('/delete-user', apiController.apiDeleteUsers);
    return app.use('/api/v1/', router);
}