const express = require('express');
import * as controllers from '../controllers';
const appRoot = require('app-root-path');
const multer = require('multer');
import path from 'path';
let router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/images/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(png|PNG)$/)) {
        req.fileValidationError = 'Chỉ ảnh png thôi';
        return cb(new Error('Chỉ ảnh png thôi!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });

export const initWebRoute = (app) => {
    router.get('/', controllers.homepage);
    router.get('/detail-user/:id', controllers.detailUser);
    router.post('/create-new-user', controllers.createNewUser);
    router.post('/delete-user', controllers.deleteUser);
    router.get('/update-user/:id', controllers.updateUser);
    router.post('/post-update-user', controllers.postUpdateUser);
    router.get('/upload-files', controllers.uploadFiles);
    router.post('/post-file', upload.single('img'), controllers.postFile);
    return app.use('/', router);
}