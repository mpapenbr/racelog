import { action } from "typesafe-actions";
import { IBaseAction } from "../../commons";
import { IRacingTelemetryActions } from "./types";

export const newPacket = (data: any): IBaseAction => action(IRacingTelemetryActions.NEW_PACKET, data);
export const disconnectLiveData = (): IBaseAction => action(IRacingTelemetryActions.DISCONNECT, {});
