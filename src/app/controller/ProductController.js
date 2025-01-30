import * as Yup from 'yup'

class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ errors: err.errors })
    }

    return response.json({ ok: true })
  }
}

export default new ProductController()
