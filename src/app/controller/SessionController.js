import * as Yup from 'yup'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ errors: err.errors })
    }

    const { email, password } = request.body

    const user = await User.findOne({
      where: { email }, // Agora está correto
      attributes: ['id', 'name', 'email', 'password_hash', 'admin'],
    })

    if (!user) {
      return response.status(401).json({ error: 'Incorrect email or password' })
    }

    const passwordValid = await bcrypt.compare(password, user.password_hash)

    if (!passwordValid) {
      return response.status(401).json({ error: 'Incorrect email or password' })
    }

    const token = jwt.sign({ id: user.id }, 'secrettoken', {
      expiresIn: '7d',
    })

    return response.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
      token,
    })
  }
}

export default new SessionController()
