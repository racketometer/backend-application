import { spawn } from "child_process";
import { IAnalysisResult } from "./";

export class AnalysisAlgorithm {
  private static scriptFileName = "data_analyse.py";

  private rawGyrY: Array<number>;
  private rawGyrX: Array<number>;
  private rawGyrZ: Array<number>;

  private rawAccX: Array<number>;
  private rawAccY: Array<number>;
  private rawAccZ: Array<number>;

  // Beregnet offset for hhv. gyro og accelerometer
  private offsetGyrX = 463;
  private offsetGyrY = 462;
  private offsetGyrZ = 466;
  private offsetAccX = 511;
  private offsetAccY = 512;
  private offsetAccZ = 516;

  /**
   * Get analysis results by use of the Python script.
   *
   * Execution of Python script in Node.js is inspirred by:
   * http://stackoverflow.com/a/20973067/5324369
   * @param fileName The raw measurement data filename.
   */
  public getResultFromFile(fileName: string): Promise<IAnalysisResult> {
    return new Promise((resolve, reject) => {
      const scriptFilename = this.fromScriptRoot(AnalysisAlgorithm.scriptFileName);

      const python = spawn("python", [scriptFilename, fileName, "raw"]);

      let jsonResult = "";
      python.stdout.on("data", (data) => jsonResult += data);

      python.on("close", (code: number) => {
        if (code !== 0) {
          reject(
            "Error executing python script: " + AnalysisAlgorithm.scriptFileName +
            "\n  Error code: " + code +
            "\n  Script: " + scriptFilename +
            "\n  File: " + fileName
          );
          return;
        }
        const result = this.parseResults(jsonResult);

        resolve(result);
      });
    });
  }

  /**
   * Analysis algorithm to find features in data set.
   * @param data Two-dimensional number array.
   * Columns refer to values as: [Gyro X, Gyro Y, Gyro Z, Acc X, Acc Y, Acc Z]
   */
  public getResults(data: Array<Array<number>>): Promise<IAnalysisResult> {
    return new Promise((resolve, reject) => {
      const SmashTest = data;

      // forskellen mellem to på hinanden følgende sampleværdier - defineret vibration <<<<<--- vigtig
      const defVibration = 35;
      // 500 samples = 1 sek
      const antalSamples = 500;
      // antal samples bagud fra fundet vibration
      const antalSamplesBagud = antalSamples + 2;
      // springe 750 samples (1,5 sek) frem for at finde næste vibration <<<<<--- vigtig
      const jump = 750;
      // bestemmer hvor (i) skal starte
      let start = 0;
      // antalSamples + antalSamplesBagud før defineret vibration == start på svingsløjfe
      const slagStart: Array<number> = [];
      // forsøger at finde x-antal slag <<<<<--- VIGTIG
      const findSlag = 20;
      // finder de 4 første slag
      let antalSlag = 4;

      // KONSTANTER - bruges til beregning af variabler
      // optagefrekvens
      const hz = 500.;
      // krydsning af x-aksen
      const niveau = 0;
      // 0.0174532925 rad = 1 grad
      const rad = 0.0174532925;
      // restitutionskoefficienten mellem fjerbold og ketcherens streng
      const e = 0.7;
      // fjerboldens vægt (5 gram)
      const fjerbold = 0.005;
      // fjerboldens indkommende hastighed m/s
      const fjerboldhastighed = -3;
      // afstanden i meter fra omdrejningspunktet på håndtaget // kan ændres afhængig af træfpunkt
      const afstand = 0.5;
      // ketsjers inertimoment (kg*m^2)   -----VIGTIG-----  skal ændres ved brug af anden/andre ketchere
      const inertimoment = 0.0085;
      // ketsjerens effektive masse i gram i træføjeblikket
      const masse = inertimoment / Math.pow(afstand, 2);

      this.getAxisValues(SmashTest);

      // anvend findSlag eller antalSlag  <<<<<--- VIGTIG
      for (let j = 0; j < findSlag; j++) {
        for (let i = start; i < this.rawGyrY.length; i++) {
          if (Math.abs(this.rawGyrY[i] - this.rawGyrY[i - 1]) >= defVibration) {
            i -= antalSamplesBagud;
            start = i + jump;
            slagStart.push(i);
            antalSlag = slagStart.length;
            break;
          }
        }
      }

      // gyr = vinkelhastigheder og acc = accelerationer, begge ganget op således at
      // de giver hhv. vinkelhastigheder (grader/s) og accelerationer (g)
      const gyrX = this.rawGyrX.map(value => Math.floor((value - this.offsetGyrX) * 19));
      const gyrY = this.rawGyrY.map(value => Math.floor((value - this.offsetGyrY) * 18.5));
      const gyrZ = this.rawGyrZ.map(value => Math.floor((value - this.offsetGyrZ) * 18.5));

      // mangler valideringstest for accelerometer
      const accX = this.rawAccX.map(value => Math.floor((value - this.offsetAccX) * 400 / 1024));
      const accY = this.rawAccY.map(value => Math.floor((value - this.offsetAccY) * 400 / 1024));
      const accZ = this.rawAccZ.map(value => Math.floor((value - this.offsetAccZ) * 400 / 1024));

      const gyrXSeq: Array<Array<number>> = [];
      const gyrYSeq: Array<Array<number>> = [];
      const gyrZSeq: Array<Array<number>> = [];
      const accXSeq: Array<Array<number>> = [];
      const accYSeq: Array<Array<number>> = [];
      const accZSeq: Array<Array<number>> = [];

      // inddeler slagene i sekvenser
      for (let i = 0; i < antalSlag; i++) {
        const startIndex = slagStart[i];
        const slutIndex = startIndex + antalSamples;
        gyrXSeq.push(gyrX.slice(startIndex, slutIndex));
        gyrYSeq.push(gyrY.slice(startIndex, slutIndex));
        gyrZSeq.push(gyrZ.slice(startIndex, slutIndex));
        accXSeq.push(accX.slice(startIndex, slutIndex));
        accYSeq.push(accY.slice(startIndex, slutIndex));
        accZSeq.push(accZ.slice(startIndex, slutIndex));
      }

      // vender sekvenser, hvis de er negative, så træfpunkt er positivt
      for (let i = 0; i < antalSlag; i++) {
        if (gyrYSeq[i][499] < 0) {
          // print('Slaget er negativt - vendt til positiv')
          gyrXSeq[i] = gyrXSeq[i];
          gyrYSeq[i] = gyrYSeq[i].map(value => value * -1);
          gyrZSeq[i] = gyrZSeq[i].map(value => value * -1);
          accXSeq[i] = accXSeq[i];
          accYSeq[i] = accYSeq[i].map(value => value * -1);
          accZSeq[i] = accZSeq[i].map(value => value * -1);
        }
      }

      // let GyrXtotal = 0;
      // for (let i = 0; i < antalSlag; i++) {
      //   GyrXtotal += gyrXSeq[i].reduce((preValue, currValue) => preValue + currValue, 0);
      // }
      // const GyrXmean = GyrXtotal / antalSlag;

      // let GyrYtotal = 0;
      // for (let i = 0; i < antalSlag; i++) {
      //   GyrYtotal += gyrYSeq[i].reduce((preValue, currValue) => preValue + currValue, 0);
      // }
      // const GyrYmean = GyrYtotal / antalSlag;

      // let GyrZtotal = 0;
      // for (let i = 0; i < antalSlag; i++) {
      //   GyrZtotal += gyrZSeq[i].reduce((preValue, currValue) => preValue + currValue, 0);
      // }
      // const GyrZmean = GyrZtotal / antalSlag;

      // let AccXtotal = 0;
      // for (let i = 0; i < antalSlag; i++) {
      //   AccXtotal += accXSeq[i].reduce((preValue, currValue) => preValue + currValue, 0);
      // }
      // const AccXmean = AccXtotal / antalSlag;

      // let AccYtotal = 0;
      // for (let i = 0; i < antalSlag; i++) {
      //   AccYtotal += accYSeq[i].reduce((preValue, currValue) => preValue + currValue, 0);
      // }
      // const AccYmean = AccYtotal / antalSlag;

      // let AccZtotal = 0;
      // for (let i = 0; i < antalSlag; i++) {
      //   AccZtotal += accZSeq[i].reduce((preValue, currValue) => preValue + currValue, 0);
      // }
      // const AccZmean = AccZtotal / antalSlag;

      // VARIABLER - bruges til definition af pop-termer
      const vinkelhastighed = [];        // ketcherføring
      const vinkelacceleration = [];     // ketcherføring
      const impulsmoment = [];           // ketcherføring
      const lineaerhastighed = [];       // ketcherføring
      const impuls = [];                 // ketcherføring
      const udgangshastighed = [];       // power

      for (let j = 0; j < antalSlag; j++) {
        // sidste sample inden der opstår vibrationer
        const point2 = gyrYSeq[j][antalSamples - 1];

        // indeksnummer for sidste sample
        const point4 = antalSamples - 1;

        for (let h = gyrYSeq[j].length - 1, i = 0; h >= 0; h-- , i++) { // i, v in enumerate(reversed(GyrY[j]))) {
          const v = gyrYSeq[j][h];
          if (v < niveau) {
            // værdien for første sample v < niveau // kan måske underværes
            const point1 = v;
            // indeksnummer for  første værdi v < niveau
            const point3 = antalSamples - 1 - i;

            // vinklehastighed (deg/s)
            vinkelhastighed.push(
              Math.sqrt(
                Math.pow(gyrXSeq[j][antalSamples - 1], 2) +
                Math.pow(gyrYSeq[j][antalSamples - 1], 2) +
                Math.pow(gyrZSeq[j][antalSamples - 1], 2)
              )
            );

            // vinkelacceleration (deg/s^2)
            vinkelacceleration.push((point2 - point1) / ((point4 - point3) / hz));

            // impulsmoment ((kg*m^2)/s)
            impulsmoment.push(vinkelhastighed[j] * rad * inertimoment);

            // lineær hastighed (m/s)
            lineaerhastighed.push(
              (vinkelhastighed[j] * rad * afstand) +
              (Math.sqrt(Math.pow(accXSeq[j][antalSamples - 1], 2) +
                Math.pow(accYSeq[j][antalSamples - 1], 2) +
                Math.pow(accZSeq[j][antalSamples - 1], 2)) / hz)
            );

            // lineær impuls ((kg*m)/s)
            impuls.push(lineaerhastighed[j] * masse);

            // udgangshastighed (m/s)
            udgangshastighed.push(((1 + e) / (masse + fjerbold) * impuls[j]) +
              ((fjerbold - e * masse) / (masse + fjerbold)) * fjerboldhastighed);

            break; // break skal være sat til
          }
        }
      }

      const vinkelhastighedmean = this.average(vinkelhastighed);
      // const vinkelhastighedstd = this.stdDeviation(vinkelhastighed, vinkelhastighedmean);

      const vinkelaccelerationmean = this.average(vinkelacceleration);
      // const vinkelaccelerationstd = this.stdDeviation(vinkelacceleration, vinkelaccelerationmean);

      const impulsmomentmean = this.average(impulsmoment);
      // const impulsmomentstd = this.stdDeviation(impulsmoment, impulsmomentmean);

      const lineaerhastighedmean = this.average(lineaerhastighed);
      // const lineaerhastighedstd = this.stdDeviation(lineaerhastighed, lineaerhastighedmean);

      const impulsmean = this.average(impuls);
      // const impulsstd = this.average(impuls);

      const udgangshastighedmean = this.average(udgangshastighed);
      // const udgangshastighedstd = this.stdDeviation(udgangshastighed, udgangshastighedmean);
      // const udgangshastighedkph = this.average(udgangshastighed) * 3.6;

      const result: IAnalysisResult = {
        strokes: antalSlag,
        angular: {
          speed: vinkelhastighedmean,
          acceleration: vinkelaccelerationmean,
        },
        impuls: impulsmomentmean,
        linear: {
          speed: lineaerhastighedmean,
          impulse: impulsmean,
        },
        shuttlecock: {
          speed: udgangshastighedmean,
        },
        version: "1.0",
      };
      resolve(result);
    });
  }

  private average(data: Array<number>): number {
    return data.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / data.length;
  }

  /**
   * Calculate the standard deviation of numbers.
   * Inspired by:
   * https://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/
   *
   * @param data The data.
   * @param average Optional average value if previously calculated.
   */
  // private stdDeviation(data: Array<number>, average?: number): number {
  //   if (average === undefined || average === null) {
  //     average = this.average(data);
  //   }
  //   const squareDiffs = data.map((value) => {
  //     const diff = value - average;
  //     const squareDiff = diff * diff;
  //     return squareDiff;
  //   });

  //   const averageSquareDiff = this.average(squareDiffs);
  //   const stdDeviation = Math.sqrt(averageSquareDiff);

  //   return stdDeviation;
  // }

  /**
   * Get each axis' value from data measurement.
   * @param data The data.
   */
  private getAxisValues(data: Array<Array<number>>): void {
    this.rawGyrX = [];
    this.rawGyrY = [];
    this.rawGyrZ = [];
    this.rawAccX = [];
    this.rawAccY = [];
    this.rawAccZ = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      this.rawGyrX.push(row[0]);
      this.rawGyrY.push(row[1]);
      this.rawGyrZ.push(row[2]);
      this.rawAccX.push(row[3]);
      this.rawAccY.push(row[4]);
      this.rawAccZ.push(row[5]);
    }
  }

  private parseResults(json: string): IAnalysisResult {
    const jsonResult = JSON.parse(json) as IAnalysisResult;
    return jsonResult;
  }

  private fromScriptRoot(filename: string): string {
    return `${__dirname}/../../scripts/${filename}`;
  }
}
