import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { sprintf } from "sprintf-js";
import { Driver, ResponseData } from "../irsdk/sdk-data";
import { ApplicationState } from "../stores";

const DriverContainer: React.FC = () => {
  const iracing = useSelector(({ iracing }: ApplicationState) => iracing);
  const trackLength = parseFloat(iracing.staticInfo.weekendInfo.TrackLength.match(/(.*?) km/)![1]) * 1000;
  var d: Driver;
  const extractData = (r: ResponseData | undefined) => ({
    lap: r !== undefined ? r.CarIdxLap : new Array<number>(64),
    rankPos: r !== undefined ? r.CarIdxPosition : new Array<number>(64),
    inPit: r !== undefined ? r.CarIdxOnPitRoad : new Array<number>(64),
    inTrackPos: r !== undefined ? r.CarIdxLapDistPct : new Array<number>(64),
    stamp: r !== undefined ? r.SessionTime : 0,
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
      trackPct: current.inTrackPos[d.CarIdx],
      trackPos: current.inTrackPos[d.CarIdx] * trackLength,
      mBehind: 0,
      mAhead: 0,
      speed: 0,
      delta: 0,
      trackLen: trackLength,
    }));
  const sorted = dings
    // .filter((d) => d.pos! > 0)
    .sort((a, b) => {
      const posComp = current.lap[a.CarIdx] - current.lap[b.CarIdx];
      if (posComp === 0) {
        return current.inTrackPos[a.CarIdx] > current.inTrackPos[b.CarIdx] ? -1 : 1;
      } else {
        return -posComp;
      }
    });

  const deltaMeters = (a: number, b: number): number => (a >= b ? a - b : trackLength - b + a);
  sorted.forEach((d, idx) => {
    d.speed = (deltaMeters(d.trackPos, prev.inTrackPos[d.CarIdx] * trackLength) / elapsed) * 3.6;
    if (idx > 0) {
      d.mBehind = deltaMeters(sorted[idx - 1].trackPos, d.trackPos);
      d.delta = d.mBehind / (d.speed / 3.6);
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
      title: "Lap",
      dataIndex: "lap",
    },
    {
      title: "Pit",
      dataIndex: "pit",
    },

    {
      title: "Pct",
      dataIndex: "trackPct",
      render: (v: number) => sprintf("%.4f", v),
    },
    {
      title: "Pos(m)",
      dataIndex: "trackPos",
      render: (v: number) => sprintf("%.1f", v),
    },
    {
      title: "Behind(m)",
      dataIndex: "mBehind",
      render: (v: number) => sprintf("%.1f", v),
    },
    {
      title: "Behind(sec)",
      dataIndex: "delta",
      render: (v: number) => sprintf("%.1f", v),
    },
    {
      title: "Speed",
      dataIndex: "speed",
      render: (v: number) => sprintf("%.1f", v),
    },
  ];
  return <Table dataSource={sorted} columns={columns} size="small" pagination={false} />;
};

export default DriverContainer;
