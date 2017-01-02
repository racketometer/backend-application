export class AppConfig {
  /**
   * Is application running in production.
   */
  public readonly isProduction: boolean;

  /**
   * Is application running in development.
   */
  public readonly isDevelopment: boolean;

  /**
   * MongoDB instance URI.
   */
  public readonly mongoDbUrl: string;

  /**
   * GraphQL port number.
   */
  public readonly graphQLPort: number;

  /**
   * Email transmittion identifier.
   */
  public readonly emailTransmitterId: string;

  constructor() {
    this.isProduction = process.env.NODE_ENV === "prod";
    this.isDevelopment = !this.isProduction;

    this.graphQLPort = process.env.PORT || 8080;

    if (this.isProduction) {
      this.mongoDbUrl = process.env.ROM_DB_PROD;
    } else {
      this.mongoDbUrl = process.env.ROM_DB_TEST;
    }

    if (!this.mongoDbUrl) {
      throw Error("AppConfig: No MongoDB URL defined. \n" +
        "Use environment variable 'ROM_DB_PROD' or 'ROM_DB_TEST' to specify to the MongoDB instance to use.");
    }

    this.emailTransmitterId = "'Mailgun Sandbox' <postmaster@sandbox1eb8c6413a794f788fe668e6978bcf42.mailgun.org>";
  }
}
