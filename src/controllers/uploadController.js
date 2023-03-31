export const uploadFiles = async (req, res) => {
    return res.render('upload-files.ejs');
}


export const postFile = async (req, res) => {
    // Display uploaded image for user validation
    return res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="upload-files">Tải ảnh khác</a>`);
}
export const postFiles = async (req, res) => {
    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        console.log(files[index]);
        result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="upload-files">Upload more images</a>';
    return res.send(result);
}
