import Sequelize from 'sequelize'
import databaseConfig from './config/database.js' // Configuração do banco de dados
import User from './app/models/User.js'

// Cria a conexão com o banco de dados
const connection = new Sequelize(databaseConfig)

// Inicializa o modelo User
User.init(connection)

// Exporta a conexão para uso futuro (se necessário)
export default connection
