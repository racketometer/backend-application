import {
  AnalysisAlgorithm,
  IAnalysisResult,
} from "./";

import { IMeasurementModel, Measurement } from "../../connectors";

export class AlgorithmMediator {
  private analysisAlgorithm: AnalysisAlgorithm;

  constructor() {
    this.analysisAlgorithm = new AnalysisAlgorithm();
  }

  /**
   * Analyse a measurement and update result fields.
   */
  public getAnalysis(): Promise<void> {
    return Measurement.findOne({ sensorNo: "123141" })
      .then((document) => this.calculateFeatures(document));
  }

  /**
   * Calculate features and update measurement.
   * @param document The measurement.
   */
  private calculateFeatures(document: IMeasurementModel): Promise<void> {
    const data = document.data;

    return this.analysisAlgorithm.getResults(data)
      .then((result) => this.updateMeasurement(document, result));
  }

  /**
   * Update a measurement with analysis results.
   * @param document The measurement to update.
   * @param result The analysis result.
   */
  private updateMeasurement(document: IMeasurementModel, result: IAnalysisResult): void {
    document.strokes = result.strokes;
    document.maxRacketSpeed = result.linear.speed;
    document.maxShuttlecockSpeed = result.shuttlecock.speed;
    document.algorithmVersion = result.version;

    document.save();
  }
}
