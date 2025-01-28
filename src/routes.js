import { Router } from 'express'
import UserController from './app/controller/UserController.js'
import SessionController from './app/controller/SessionController.js'
const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

export default routes
