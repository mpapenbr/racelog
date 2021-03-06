import { Reducer } from "redux";
import { SdkResponse } from "../../irsdk/sdk-data";
import { updateDrivers, updateGeneralInfo, updateStaticInfo, updateTelemetryData } from "./extract/extractData";
import { defaultIRacingState, IRacingState, IRacingTelemetryActions } from "./types";

const reducer: Reducer<IRacingState> = (state = defaultIRacingState, action) => {
  switch (action.type) {
    case IRacingTelemetryActions.NEW_PACKET: {
      const sdkData: SdkResponse = JSON.parse(action.payload);
      if (sdkData.connected) {
        return { ...state, liveData: true };
      }

      if (sdkData.disconnected) {
        return { ...state, liveData: false };
      }

      return {
        ...state,
        liveData: true,
        haveData: true,
        staticInfo: updateStaticInfo(state.staticInfo, sdkData.data),
        generalInfo: updateGeneralInfo(state.generalInfo, sdkData.data),
        drivers: updateDrivers(state.drivers, sdkData.data),
        telemetryData: updateTelemetryData(state, sdkData.data),
        // telemetryData: {
        //   numPackets: state.telemetryData.numPackets + 1,
        //   prevResponse: state.telemetryData.currentResponse,
        //   currentResponse: sdkData.data,
        // },
      };
    }

    case IRacingTelemetryActions.DISCONNECT: {
      return { ...state, liveData: false };
    }

    default:
      return state;
  }
};
export { reducer as iRacingReducer };
