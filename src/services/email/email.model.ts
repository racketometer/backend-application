import { validate } from "email-validator";

export class Email {
  /**
   * Email model for the email service.
   */
  constructor(
    public to: string,
    public subject: string,
    public text: string,
    public html: string,
  ) { }

  /**
   * Is email valid.
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
