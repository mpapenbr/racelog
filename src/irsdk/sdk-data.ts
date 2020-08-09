import { WeatherInfo } from "./WeatherInfo";

export interface SessionInfo {
  Sessions: SessionData[];
}

export interface SessionData {
  SessionName: string;
  SessionNum: number;
  ResultsPositions: ResultPosition[];
}

export interface ResultPosition {
  CarIdx: number;
  Lap: number;
  LastTime: number;
  LapsComplete: number;
  Time: number;
}

export interface DriverInfo {
  Drivers: Driver[];
}

export interface Driver {
  CarID: number;
  CarIdx: number;
  CarNumber: string;
  CarScreenName: string;
  CarScreenNameShort: string;
  IRating: number;
  TeamID: number;
  TeamName: string;
  UserID: number;
  UserName: string;
}

export interface WeekendInfo {
  SessionID: number;
  SubSessionID: number; // dies ist wohl die SessionID, die für Results verwendet wird.
  TeamRacing: boolean;
  TrackAirPressure: string;
  TrackAirTemp: string;
  TrackWeatherType: string;
  TrackCleanup: boolean;
  TrackConfigName: string;
  TrackDisplayName: string;
  TrackDisplayShortName: string;
  TrackDynamicTrack: boolean;
  TrackSkies: string;
  TrackSurfaceTemp: string;
}
export function defaultWeekendInfo(): WeekendInfo {
  return {
    SessionID: 0,
    SubSessionID: 0,
    TeamRacing: false,
    TrackAirPressure: "",
    TrackAirTemp: "",
    TrackWeatherType: "",
    TrackCleanup: false,
    TrackConfigName: "",
    TrackDisplayName: "",
    TrackDisplayShortName: "",
    TrackDynamicTrack: false,
    TrackSkies: "",
    TrackSurfaceTemp: "",
  };
}

export const defaultDriver: Driver = {
  CarID: 0,
  CarIdx: 0,
  CarNumber: "",
  CarScreenName: "",
  CarScreenNameShort: "",
  IRating: 0,
  TeamID: 0,
  TeamName: "",
  UserID: 0,
  UserName: "",
};

export class GeneralInfo {
  public sessionTimeOfDay: number = 0;
  public sessionTime: number = 0;
  public sessionTimeRemain: number = 0;
  public sessionTick: number = 0;
  public sessionNum: number = 0;
  public sessionName: string = "";
  public sessionFlags: number = 0;
  public sessionState: number = 0;
  public sessionId: number = 0;
  public subSessionId: number = 0;
  public teamRacing: boolean = false;
  public weather: WeatherInfo = new WeatherInfo();
}

// eins dieser Attribute ist gefüllt
export interface SdkResponse {
  connected: boolean;
  disconnected: boolean;
  data: ResponseData;
}
export interface ResponseData {
  SessionTimeOfDay: number;
  SessionTick: number;
  SessionTime: number;
  SessionTimeRemain: number;
  SessionNum: number;
  SessionName: string;
  SessionFlags: number;
  SessionState: number;
  IsInGarage: boolean;
  AirTemp: number;
  TrackTemp: number;
  TrackTempCrew: number;
  WindDir: number;
  WindVel: number;
  CarIdxLapDistPct: number[];
  CarIdxLap: number[];
  CarIdxF2Time: number[];
  CarIdxOnPitRoad: boolean[];
  SessionInfo: SessionInfo;
  DriverInfo: DriverInfo;
  WeekendInfo: WeekendInfo;
}
