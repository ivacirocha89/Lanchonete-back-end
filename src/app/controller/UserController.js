import { v4 } from 'uuid'
import * as Yup from 'yup'
import User from '../models/User.js'

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password_hash: Yup.string().required().min(6),
      admin: Yup.boolean(),
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, email, password_hash, admin } = request.body

    // Verificar se o e-mail já existe
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
      return response.status(400).json({ error: 'E-mail já cadastrado' })
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    })

    return response.status(201).json(user)
  }
}

export default new UserController()
