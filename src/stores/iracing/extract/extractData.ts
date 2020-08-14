import _ from "lodash";
import { Driver, GeneralInfo, ResponseData } from "../../../irsdk/sdk-data";
import { StaticInfo } from "../../../irsdk/StaticInfo";
import { IRacingState, ITelemetryData } from "../types";

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

export function updateDrivers(currentValue: Driver[], rawData: ResponseData): Driver[] {
  if (rawData.DriverInfo !== undefined) {
    return rawData.DriverInfo.Drivers;
  }
  return currentValue;
}

interface SplitTime {}
const SplitAt = [0, 0.33, 0.66];
export function updateTelemetryData(state: IRacingState, rawData: ResponseData): ITelemetryData {
  const ret: ITelemetryData = {
    numPackets: state.telemetryData.numPackets + 1,
    prevResponse: state.telemetryData.currentResponse,
    currentResponse: rawData,
  };
  const zeroedArray = (num: number, v: number = 0) => {
    const a = new Array(num);
    _.fill(a, v);
    return a;
  };
  //TODO: Refactor: wird auch in driverContainer benutzt.
  // const trackLength = parseFloat(state.staticInfo.weekendInfo.TrackLength.match(/(.*?) km/)![1]) * 1000;
  const deltaPct = (a: number, b: number): number => (a >= b ? a - b : 1 - b + a);

  const splitBucketNo = (pct: number): number => {
    let i = SplitAt.length;
    while (SplitAt[--i] > pct) {}
    return i;
  };
  if (ret.prevResponse !== undefined) {
    if (rawData.CarIdxSplitTimes === undefined) {
      // var x = new Array(64);
      // for (var i = 0; i < x.length; i++) {
      //   x[i] = new Array(3);
      //   _.fill(x[i], 0);
      // }
      rawData.CarIdxSplitTimes = Object.assign([], ret.prevResponse.CarIdxSplitTimes);
      rawData.CarIdxOnPitRoadTime = Object.assign([], ret.prevResponse.CarIdxOnPitRoadTime);
      rawData.CarIdxPitActionTime = Object.assign([], ret.prevResponse.CarIdxPitActionTime);
    }

    const elapsed = rawData.SessionTime - ret.prevResponse.SessionTime;
    state.drivers
      .filter((d) => d.CarIsPaceCar === 0)
      .filter((d) => d.IsSpectator === 0)

      .forEach((d) => {
        if (rawData.CarIdxLapDistPct[d.CarIdx] < 0) {
          return;
        }
        if (rawData.CarIdxLapDistPct[d.CarIdx] - ret.prevResponse!.CarIdxLapDistPct[d.CarIdx] < 0) {
          // just crossed the s/f
          rawData.CarIdxSplitTimes[d.CarIdx][rawData.CarIdxSplitTimes[d.CarIdx].length - 1] += elapsed;
          rawData.CarIdxSplitTimes[d.CarIdx][0] = 0;
        } else {
          const lastBucket = splitBucketNo(ret.prevResponse!.CarIdxLapDistPct[d.CarIdx]);
          const thisBucket = splitBucketNo(rawData.CarIdxLapDistPct[d.CarIdx]);
          if (thisBucket === lastBucket) {
            rawData.CarIdxSplitTimes[d.CarIdx][thisBucket] += elapsed;
          } else {
            rawData.CarIdxSplitTimes[d.CarIdx][lastBucket] += elapsed;
            rawData.CarIdxSplitTimes[d.CarIdx][thisBucket] = 0;
          }

          // splitBucket = rawData.CarIdxLapDistPct[d.CarIdx];
        }
        if (rawData.CarIdxOnPitRoad[d.CarIdx]) {
          if (ret.prevResponse!.CarIdxOnPitRoad[d.CarIdx]) {
            // car entered pit road with this event.
            rawData.CarIdxOnPitRoadTime[d.CarIdx] += elapsed;
          } else {
            rawData.CarIdxOnPitRoadTime[d.CarIdx] = elapsed;
            rawData.CarIdxPitActionTime[d.CarIdx] = 0;
          }

          if (
            Math.abs(deltaPct(rawData.CarIdxLapDistPct[d.CarIdx], ret.prevResponse!.CarIdxLapDistPct[d.CarIdx])) < 0.01
          ) {
            rawData.CarIdxPitActionTime[d.CarIdx] += elapsed;
          }
        }
      });
  } else {
    var x = new Array(64);
    for (var i = 0; i < x.length; i++) {
      x[i] = new Array(3);
      _.fill(x[i], 0);
    }
    rawData.CarIdxSplitTimes = x;
    rawData.CarIdxOnPitRoadTime = zeroedArray(64);
    rawData.CarIdxPitActionTime = zeroedArray(64);
  }
  return ret;
}
