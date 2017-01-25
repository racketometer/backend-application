import { createTransport, SendMailOptions, Transporter } from "nodemailer";
import { Email } from "./email.model";

export interface IEmailResponse {
  success: boolean;
  message: string;
}

export class EmailService {
  private transporter: Transporter;

  /**
   * Email service for sending messages over SMTP.
   */
  constructor(private transmitter: string) {
    this.transporter = createTransport();
  }

  /**
   * Send email.
   */
  public sendMail(email: Email): Promise<IEmailResponse> {
    return new Promise<IEmailResponse>((resolve, reject) => {

      if (email.isValid()) {
        this.transporter.sendMail(this.emailToMailOptions(email), (error) => {
          if (error) {
            return reject(this.createResponse("Error sending mail: " + error));
          }
          return resolve(this.createResponse("OK"));
        });
      } else {
        return reject(this.createResponse("Invalid email adresse"));
      }

    });
  }

  /**
   * Convert email to SendMailOptions.
   */
  private emailToMailOptions(email: Email): SendMailOptions {
    return {
      from: this.transmitter,
      to: email.to,
      text: email.text,
      html: email.html,
    };
  }

  /**
   * Creates the email response from the received message.
   * @param message The response message.
   */
  private createResponse(message: string): IEmailResponse {
    if (message === "OK") {
      return {
        success: true,
        message: "OK",
      };
    } else {
      return {
        success: false,
        message,
      };
    }
  }
}
