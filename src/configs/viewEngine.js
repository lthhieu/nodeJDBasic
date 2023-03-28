const express = require('express');


export const viewEngine = (app) => {
    // Thiết lập thư mục chứa các file EJS
    app.set('views', './src/views');

    // Thiết lập template engine là EJS
    app.set('view engine', 'ejs');

    // Cấu hình middleware để phục vụ các tệp tĩnh trong thư mục public
    app.use(express.static('./src/public'));
}