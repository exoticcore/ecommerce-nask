import nodemailer from 'nodemailer';
import { logger } from './logger';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(<string>process.env.SMTP_PORT),
  secure: parseInt(<string>process.env.SMTP_PORT) === 465 ? true : true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  // host: 'smtp.ethereal.email',
  // port: 587,
  // auth: {
  //   user: 'vinnie.jerde@ethereal.email',
  //   pass: 'tbQU18ZKECRnSuRSnn',
  // },
});

async function sendMail(reciever: string, token: string) {
  const info = await transporter.sendMail({
    from: '"Nask Verify" <noreply@nask.com>',
    to: reciever,
    subject: 'Verify your email',
    html: `<p>please verify your email</p><a href="${
      process.env.ORIGIN || 'http://localhost:3000'
    }/auth/verify/${token}">verify here</a>`,
  });

  logger.info('Email sent: %s', info.messageId);
}

// export default sendMail;

export default class SendMail {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(<string>process.env.SMTP_PORT),
      secure: parseInt(<string>process.env.SMTP_PORT) === 465 ? true : false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendMail(reciever: string, token: string) {
    const info = await this.transporter.sendMail({
      from: '"Nask Verify" <noreply@nask.com>',
      to: reciever,
      subject: 'Verify your email',
      html: `<p>please verify your email</p><a href="${
        process.env.ORIGIN || 'http://localhost:3000'
      }/auth/verify/${token}">verify here</a>`,
    });
    // console.log(info);
    return reciever;
  }
}
