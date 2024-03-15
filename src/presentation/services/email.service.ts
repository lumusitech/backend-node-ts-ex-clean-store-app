import nodemailer, { Transporter } from 'nodemailer'

export interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments?: Attachment[]
}

export interface Attachment {
  filename: string
  path: string
}

export class EmailService {
  private transporter: Transporter

  constructor(
    mailerService: string,
    mailerEmail: string,
    mailerSecretKey: string,
    // postToProvider get the value from env var SEND_EMAIL_ENABLE
    private readonly postToProvider: boolean,
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: mailerSecretKey,
      },
    })
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options

    try {
      // If env var named SEND_EMAIL_ENABLE is false, this simulate a success response (dev)
      if (!this.postToProvider) return true

      // If env var named SEND_EMAIL_ENABLE is true, this send email (prod)
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      })

      // better with a logger like winston
      console.log(sentInformation)

      return true
    } catch (error) {
      console.log({ error })

      return false
    }
  }
}
