import { GeneralInfo, ResponseData } from "../../../irsdk/sdk-data";
import { StaticInfo } from "../../../irsdk/StaticInfo";

export function updateStaticInfo(currentValue: StaticInfo, rawData: ResponseData): StaticInfo {
  if (rawData.WeekendInfo !== undefined) {
    console.log("Dann mal los");
    console.log(rawData.WeekendInfo);
    return { weekendInfo: rawData.WeekendInfo };
  }
  return currentValue;
}
export function updateGeneralInfo(currentValue: GeneralInfo, rawData: ResponseData): GeneralInfo {
  if (rawData !== undefined) {
    return {
      ...currentValue,
      sessionTimeOfDay: rawData.SessionTimeOfDay,
      sessionTime: rawData.SessionTime,
      sessionTimeRemain: rawData.SessionTimeRemain,
      weather: {
        airTemp: rawData.AirTemp,
        trackTemp: rawData.TrackTemp,
        trackTempCrew: rawData.TrackTempCrew,
        windDir: rawData.WindDir,
        windVel: rawData.WindVel,
      },
    };
  }
  return currentValue;
}
