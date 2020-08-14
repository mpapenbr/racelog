import { Driver, GeneralInfo, ResponseData } from "../../irsdk/sdk-data";
import { defaultStaticInfo, StaticInfo } from "../../irsdk/StaticInfo";

export interface ITelemetryData {
  numPackets: number;
  currentResponse?: ResponseData;
  prevResponse?: ResponseData;
}
export const defaultTelemetryData: ITelemetryData = {
  numPackets: 0,
};

export enum IRacingTelemetryActions {
  NEW_PACKET = "@@/telemetry/NEW_PACKET",
  DISCONNECT = "@@/telemetry/DISCONNECT",
}

export interface IRacingState {
  readonly liveData: boolean; // true when recieving live data via iracing
  readonly haveData: boolean; // true when first data packet was recieved
  readonly staticInfo: StaticInfo;
  readonly generalInfo: GeneralInfo;
  readonly drivers: Driver[];

  readonly telemetryData: ITelemetryData;
}
export const defaultIRacingState: IRacingState = {
  telemetryData: defaultTelemetryData,
  liveData: false,
  haveData: false,
  staticInfo: defaultStaticInfo(),
  generalInfo: new GeneralInfo(),
  drivers: [],
};
