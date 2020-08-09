import { WeekendInfo, defaultWeekendInfo } from "./sdk-data";

export interface StaticInfo {
    weekendInfo : WeekendInfo,
}

export function defaultStaticInfo() {
    return {
        weekendInfo: defaultWeekendInfo()
    }
}