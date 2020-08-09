import { Button, Card, Col, Input, Row, Tag } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../stores";

interface IStateProps {}
interface IDispatchProps {
  onMessage: (data: any) => void;
  onDisconnect: () => void;
}

type MyProps = IDispatchProps & IStateProps;

const Connection: React.FC<MyProps> = (props: MyProps) => {
  const [ws, setWs] = useState<WebSocket>();
  const [dataServerConnected, setDataServerConnected] = useState(false);

  const liveData = useSelector(({ iracing }: ApplicationState) => iracing.liveData);
  const storedServers: string = localStorage.getItem("servers") || '["ws://localhost:8182/ws"]';
  const [serverAddress, setServerAddress] = useState("ws://localhost:8182/ws");
  const doConnect = () => {
    const ws = new WebSocket(serverAddress);
    setWs(ws);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          fps: 1,
          requestParams: [
            "DriverInfo",
            "AirTemp",
            "TrackTemp",
            "CarIdxLap",
            "CarIdxF2Time",
            "CarIdxLapDistPct",
            "CarIdxOnPitRoad",
            "SessionInfo",
            "SessionTimeOfDay",
            "SessionTime",
            "SessionTimeRemain",
            "WindDir",
            "WindVel",
          ],
          requestParamsOnce: ["WeekendInfo"],
        })
      );
      setDataServerConnected(true);
    };
    ws.onmessage = (msg: MessageEvent) => {
      props.onMessage(msg.data);
    };
    ws.onclose = () => {
      setDataServerConnected(false);
    };
  };
  const doDisconnect = () => {
    ws?.close();
    props.onDisconnect();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerAddress(e.target.value);
  };
  return (
    <Row>
      <Col>
        <Card title="iRacing App server">
          <Input onChange={onChange} value={serverAddress} />
          <Button onClick={doConnect} disabled={dataServerConnected}>
            Connect
          </Button>
          <Button onClick={doDisconnect} disabled={!dataServerConnected}>
            Disconnect
          </Button>
          <Tag color={liveData ? "success" : "default"}>iRacing</Tag>
        </Card>
      </Col>
    </Row>
  );
};

export default Connection;
