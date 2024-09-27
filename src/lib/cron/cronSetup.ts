import { CronJob } from 'cron'
import { verifyUsersToBeDeleted } from '../../helpers/verifyUsersToBeDeleted.js'

export class CronBootstrap {
  private secretKey: string
  private cronTimeExpression: string

  constructor() {
    this.secretKey = process.env.SECRET_KEY_CRON!
    this.cronTimeExpression = '0 0 * * *'

    this.start()
  }

  start() {
    const job = new CronJob(
      this.cronTimeExpression,
      async () => {
        await verifyUsersToBeDeleted()
      },
      null,
      true,
      'America/Recife'
    )

    console.log('Cron initialized')
  }
}
