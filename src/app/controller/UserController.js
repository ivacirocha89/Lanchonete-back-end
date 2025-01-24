import { v4 } from 'uuid'
import * as Yup from 'yup'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

class UserController {
  async store(request, response) {
    // Validação dos dados com Yup
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório.'),
      email: Yup.string()
        .email('E-mail inválido.')
        .required('O e-mail é obrigatório.'),
      password_hash: Yup.string()
        .required('A senha é obrigatória.')
        .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
      admin: Yup.boolean(),
    })

    try {
      // Valida os dados enviados no body
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      // Retorna os erros de validação
      return response.status(400).json({ errors: err.errors })
    }

    const { name, email, password_hash, admin } = request.body

    // Verificar se o e-mail já existe no banco de dados
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
      return response.status(400).json({ error: 'E-mail já cadastrado.' })
    }

    const hashedPassword = await bcrypt.hash(password_hash, 8)

    // Criar o novo usuário
    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash: hashedPassword,
      admin,
    })

    // Retornar apenas os dados necessários
    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    })
  }
}

export default new UserController()
