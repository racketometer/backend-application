import { validate } from "email-validator";

export class Email {

  constructor(
    public to: string,
    public subject: string,
    public text: string,
    public html: string
    ) { }

  /**
   * Validates the Email
   */
    public isValid(): boolean {
      return !!(
      validate(this.to) &&
      this.subject &&
      this.text &&
      this.html
      );
    }
}
