import { Router } from 'express'
import UserController from './app/controller/UserController.js'
import SessionController from './app/controller/SessionController.js'
import ProductController from './app/controller/ProductController.js'
const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.post('/products', ProductController.store)

export default routes
