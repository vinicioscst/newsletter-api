import 'dotenv/config'
import express, { Router } from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { readFile } from 'fs/promises'
import { ArticleRouter } from './router/article.router.js'
import { errorHandler } from './helpers/errors/errorHandler.js'
import { prisma } from './database/prisma/prismaClient.js'
import { UserRouter } from './router/user.router.js'
import { LoginRouter } from './router/login.router.js'
import { CronBootstrap } from './lib/cron/cronSetup.js'

const swaggerConfig = JSON.parse(
  await readFile('./src/lib/swagger/swagger.json', 'utf8')
)

class ServerBootstrap {
  public app: express.Application = express()
  private port: number = Number(process.env.PORT)
  private cron: CronBootstrap

  constructor() {
    this.middlewares()
    this.routes()
    this.cron = new CronBootstrap()

    this.app.use(errorHandler)

    this.listen()
  }

  private middlewares() {
    this.app.use(
      '/api/docs',
      cors({ origin: '*' }),
      swaggerUi.serve,
      swaggerUi.setup(swaggerConfig, {
        swaggerOptions: { supportedSubmitMethods: [] }
      })
    )

    this.app.use(
      cors({
        origin: [
          'http://localhost:8000',
          'https://newsletter-prod.vercel.app',
          'https://newsletter-homolog.vercel.app'
        ]
      })
    )

    this.app.use(express.json())
  }

  private routes() {
    this.app.use('/api', this.routers())
  }

  private routers(): Router[] {
    return [
      new ArticleRouter().router,
      new UserRouter().router,
      new LoginRouter().router
    ]
  }

  public listen() {
    this.app.listen(this.port || 3000, () => {
      console.log(`Server listening on port ${this.port}`)
    })
  }
}

new ServerBootstrap()

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  console.log('Database disconnected')
  process.exit()
})
