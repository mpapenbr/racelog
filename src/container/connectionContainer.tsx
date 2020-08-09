import { Col, Row } from "antd";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Connection from "../components/record/connection";
import SessionInfo from "../components/record/sessioninfo";
import StaticInfo from "../components/record/staticinfo";
import { disconnectLiveData, newPacket } from "../stores/iracing/actions";

const ConnectionContainer: React.FC = () => {
  const dispatch = useDispatch();

  const dispatchToProps = {
    onMessage: useCallback((data: any) => dispatch(newPacket(data)), [dispatch]),
    onDisconnect: useCallback(() => dispatch(disconnectLiveData()), [dispatch]),
    // setDuration: useCallback((d: number) => dispatch(setDuration(d)), [dispatch]),
    // sagaTestDouble: useCallback((d: number) => dispatch(sagaTestDouble(d)), [dispatch]),
    // quickProposal: useCallback((param: ISimpleRaceProposalParam) => dispatch(computeQuickProposal(param)), [dispatch]),
  };
  return (
    <Row>
      <Col>
        <Connection {...dispatchToProps} />
      </Col>
      <Col>
        <StaticInfo />
      </Col>
      <Col>
        <SessionInfo />
      </Col>
    </Row>
  );
};

export default ConnectionContainer;
