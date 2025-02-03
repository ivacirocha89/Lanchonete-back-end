import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer.js'

import UserController from './app/controller/UserController.js'
import SessionController from './app/controller/SessionController.js'
import ProductController from './app/controller/ProductController.js'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.post('/products', upload.single('file'), ProductController.store)

export default routes
