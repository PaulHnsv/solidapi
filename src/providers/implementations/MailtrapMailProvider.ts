import { IMailProvider, IMessage } from "./../IMailProviders";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8e5cc631dad20b",
        pass: "9089065f594b14",
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    this.transporter.sendMail({
      to: { name: message.to.name, address: message.to.email },
      from: { name: message.from.name, address: message.from.email },
      subject: message.subject,
      html: message.body,
    });
  }
}
