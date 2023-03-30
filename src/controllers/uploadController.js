const multer = require('multer');

export const uploadFiles = async (req, res) => {
    return res.render('upload-files.ejs');
}


export const postFile = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Chọn ảnh png!');
    }
    else {
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="upload-files">Tải ảnh khác</a>`);
    }
}
