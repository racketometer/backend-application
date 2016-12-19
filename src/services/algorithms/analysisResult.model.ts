export interface IAnalysisResult {
  strokes: number;
  impuls: number;
  shuttlecock: {
    speed: number;
  };
  angular: {
    acceleration: number;
    speed: number;
  };
  linear: {
    impulse: number;
    speed: number;
  };
  version: string;
}
