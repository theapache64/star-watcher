
import * as nodemailer from 'nodemailer';
import { SecretConstants } from './SecretConstants';

export class Mailer {
  public static sendMail(to: string, currentStarCount: number, onSuccess: () => void) {

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SecretConstants.GMAIL_USERNAME,
        pass: SecretConstants.GMAIL_PASSWORD
      }
    });

    transport.sendMail(
      {
        from: SecretConstants.GMAIL_USERNAME,
        to,
        subject: `Star Reached: ${currentStarCount}`,
        text: `Star Reached: ${currentStarCount}`
      },
      (error, info) => {
        if (error) {
          console.log(`✖️ Failed to send: ${error}: ${info}`);
        } else {
          console.log('👍 Sent: ', info);
          onSuccess()
        }
        transport.close();
      })

  }
}