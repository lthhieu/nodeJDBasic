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
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Chỉ ảnh png thôi';
        return cb(new Error('Chỉ ảnh png thôi!'), false);
    }
    cb(null, true);
};
let uploadFile = multer({ storage: storage, fileFilter: imageFilter }).single('img');
let uploadFiles = multer({ storage: storage, fileFilter: imageFilter }).array('files', 2);

export const initWebRoute = (app) => {
    router.get('/', controllers.homepage);
    router.get('/detail-user/:id', controllers.detailUser);
    router.post('/create-new-user', controllers.createNewUser);
    router.post('/delete-user', controllers.deleteUser);
    router.get('/update-user/:id', controllers.updateUser);
    router.post('/post-update-user', controllers.postUpdateUser);
    router.get('/upload-files', controllers.uploadFiles);
    router.post('/post-file', (req, res, next) => {
        uploadFile(req, res, (err) => {
            if (req.fileValidationError) {
                return res.send('Chọn ảnh thôi!');
            }
            else if (!req.file) {
                return res.send('Chọn ảnh đi!');
            }
            else { next(); }
        });
    }, controllers.postFile);
    router.post('/post-files', (req, res, next) => {
        uploadFiles(req, res, (err) => {
            if (req.fileValidationError) {
                return res.send('Chọn hình thôi!');
            }
            else if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                return res.send('Tải tối đa 2 file thôi!');
            }
            else if (!req.files || !req.file) {
                return res.send('Chọn ảnh đi!');
            }
            else { next(); }
        });
    }, controllers.postFiles);
    return app.use('/', router);
}