import { createConnection } from 'typeorm'
import dotenv from 'dotenv'
dotenv.config()

createConnection({
  type: 'mongodb',
  url: process.env.MONGO_URL,
  port: Number(process.env.MONGO_PORT),
  database: process.env.MONGO_DATABASE,
  cache: true,
  synchronize: true,
  logging: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  entities: [
    process.env.NODE_ENV === 'prod' ? 'dist/infra/db/entity/*.js ' : 'src/infra/db/entity/**/*.ts'
  ],
  migrations: [
    'src/infra/db/migrations/**/*.ts'
  ],
  cli: {
    entitiesDir: 'src/infra/db/entity',
    migrationsDir: 'src/infra/db/migrations'
  }
}).then(() => console.log('[DATABASE] running...')).catch(error => console.log(error))
