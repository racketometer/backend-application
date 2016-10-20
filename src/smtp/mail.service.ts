import { Transporter, SendMailOptions, createTransport } from "nodemailer";
import { Email } from "./email";
import { IMailResponse } from "./IMailResponse";

export class MailService {
  private transporter: Transporter;
  private from = "'Mailgun Sandbox' <postmaster@sandbox1eb8c6413a794f788fe668e6978bcf42.mailgun.org>"

  constructor() {
    this.transporter = createTransport();
  }

  /**
   * Send email.
   */
  public sendMail(email: Email): IMailResponse {
    if (email.isValid) {
      this.transporter.sendMail(this.emailToMailOptions(email), (error, info) => {
        if (error) {
          return this.createResponse(error.message);
        }
        return this.createResponse("OK");
      });
    } else {
      return this.createResponse("Invalid email adresse");
    }
  }

  /**
   * Convert email to SendMailOptions.
   */
  private emailToMailOptions(email: Email): SendMailOptions {
    return {
      from: this.from,
      to: email.to,
      text: email.text,
      html: email.html,
    };
  }

  /**
   * Creates the email response from
   * the received message
   */
  private createResponse(message: string): IMailResponse {
    let response: IMailResponse;

    if (message === "OK") {
      response = {
        success: true,
        message: "OK",
      };
    } else {
      response = {
        success: false,
        message: message,
      };
    }
    return response;
  }
}
