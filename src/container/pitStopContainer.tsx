import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { sprintf } from "sprintf-js";
import { Driver, ResponseData } from "../irsdk/sdk-data";
import { ApplicationState } from "../stores";
import { lapTimeString } from "../utils/output";

const PitStopContainer: React.FC = () => {
  const iracing = useSelector(({ iracing }: ApplicationState) => iracing);
  const trackLength = parseFloat(iracing.staticInfo.weekendInfo.TrackLength.match(/(.*?) km/)![1]) * 1000;
  var d: Driver;
  const extractData = (r: ResponseData | undefined) => ({
    lap: r !== undefined ? r.CarIdxLap : new Array<number>(64),
    rankPos: r !== undefined ? r.CarIdxPosition : new Array<number>(64),
    inPit: r !== undefined ? r.CarIdxOnPitRoad : new Array<number>(64),
    trackPct: r !== undefined ? r.CarIdxLapDistPct : new Array<number>(64),
    lastLapTime: r !== undefined ? r.CarIdxLastLapTime : new Array<number>(64),
    stamp: r !== undefined ? r.SessionTime : 0,
    pitLane: r !== undefined ? r.CarIdxOnPitRoadTime : [],
    pitAction: r !== undefined ? r.CarIdxPitActionTime : [],
  });
  const current = extractData(iracing.telemetryData.currentResponse);
  const prev = extractData(iracing.telemetryData.prevResponse);
  const elapsed = current.stamp - prev.stamp;

  const dings = iracing.drivers
    //   .filter((d) => d.CarIsPaceCar === 0)
    .filter((d) => d.IsSpectator === 0)
    .map((d, idx) => ({
      ...d,
      key: idx,
      lap: current.lap[d.CarIdx],
      pos: current.rankPos[d.CarIdx],
      pit: current.inPit[d.CarIdx] ? "yes" : "no",
      trackPct: current.trackPct[d.CarIdx],
      trackPos: current.trackPct[d.CarIdx] * trackLength,
      pitLane: current.pitLane[d.CarIdx],
      pitAction: current.pitAction[d.CarIdx],
      lastLapTime: current.lastLapTime[d.CarIdx],
      trackLen: trackLength,
    }));
  const sorted = dings
    // .filter((d) => d.pos! > 0)
    .sort((a, b) => {
      const posComp = current.lap[a.CarIdx] - current.lap[b.CarIdx];
      if (posComp === 0) {
        return current.trackPct[a.CarIdx] > current.trackPct[b.CarIdx] ? -1 : 1;
      } else {
        return -posComp;
      }
    });

  const columns = [
    {
      title: "No",
      dataIndex: "CarNumber",
    },
    {
      title: "Name",
      dataIndex: "UserName",
    },
    {
      title: "Pos",
      dataIndex: "pos",
    },
    {
      title: "Pct",
      dataIndex: "trackPct",
      render: (v: number) => sprintf("%.4f", v),
    },

    {
      title: "Laptime",
      dataIndex: "lastLapTime",
      render: (v: number) => {
        return v > -1 ? lapTimeString(v) : "";
      },
    },
    {
      title: "Pit",
      dataIndex: "pit",
    },
    {
      title: "PitLane",
      dataIndex: "pitLane",
      render: (v: number) => {
        return lapTimeString(v);
      },
    },
    {
      title: "PitAction",
      dataIndex: "pitAction",
      render: (v: number) => {
        return lapTimeString(v);
      },
    },
  ];
  return <Table dataSource={sorted} columns={columns} size="small" pagination={false} />;
};

export default PitStopContainer;
