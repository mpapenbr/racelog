import { Card, Col, Row, Statistic } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../stores";

const StaticInfo: React.FC<{}> = () => {
  const iracing = useSelector(({ iracing }: ApplicationState) => iracing);
  return iracing.haveData ? (
    <Row>
      <Col>
        <Card title="Location">
          <Statistic title="Track" value={iracing.staticInfo.weekendInfo.TrackDisplayShortName} />
          <Statistic title="Dynamic" value={iracing.staticInfo.weekendInfo.TrackDynamicTrack ? "yes" : "no"} />
        </Card>
        <Card title="Weather">
          <Statistic title="Setting" value={iracing.staticInfo.weekendInfo.TrackWeatherType} />
          <Statistic title="Temperature" value={iracing.staticInfo.weekendInfo.TrackAirTemp} />
        </Card>
      </Col>
    </Row>
  ) : (
    <p>No data available</p>
  );
};
export default StaticInfo;
