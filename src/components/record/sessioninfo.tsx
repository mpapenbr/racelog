import { Card, Col, Row, Statistic } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { sprintf } from "sprintf-js";
import { ApplicationState } from "../../stores";
import { secAsHHMMSS, secAsString } from "../../utils/output";

const SessionInfo: React.FC<{}> = () => {
  const iracing = useSelector(({ iracing }: ApplicationState) => iracing);
  return iracing.haveData ? (
    <Row>
      <Col>
        <Card title="Session">
          <Statistic title="Time" value={secAsString(iracing.generalInfo.sessionTimeOfDay)} />
          <Statistic title="Elapsed" value={secAsHHMMSS(iracing.generalInfo.sessionTime)} />
          <Statistic title="Remaining" value={secAsHHMMSS(iracing.generalInfo.sessionTimeRemain)} />
          <Statistic title="Air temp" value={sprintf("%.2f", iracing.generalInfo.weather.airTemp)} />
          <Statistic title="Track temp" value={sprintf("%.2f", iracing.generalInfo.weather.trackTemp)} />
        </Card>
      </Col>
    </Row>
  ) : (
    <p>No data available</p>
  );
};
export default SessionInfo;
