const express = require('express')
import * as controllers from '../controllers'
const router = express.Router()

export const initWebRoute = (app) => {
    router.get('/', controllers.homepage);
    return app.use('/', router)
}