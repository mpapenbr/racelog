import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import ConnectionContainer from "../../container/connectionContainer";
import DriverContainer from "../../container/driverContainer";
import PitStopContainer from "../../container/pitStopContainer";
import SplitsContainer from "../../container/splitsContainer";
import { ApplicationState } from "../../stores";

interface IStateProps {}
interface IDispatchProps {}
type MyProps = IStateProps & IDispatchProps;
const { TabPane } = Tabs;

const TabHelper: React.FC<MyProps> = (props: MyProps) => {
  const haveData = useSelector(({ iracing }: ApplicationState) => iracing.haveData);
  return (
    <Tabs type="card">
      <TabPane tab="Connection" key="Connection">
        <ConnectionContainer />
      </TabPane>
      {haveData ? (
        <>
          <TabPane tab="Driver" key="Driver">
            <DriverContainer />
          </TabPane>
          <TabPane tab="Splits" key="Splits">
            <SplitsContainer />
          </TabPane>
          <TabPane tab="Pitstop" key="Pitstop">
            <PitStopContainer />
          </TabPane>
        </>
      ) : (
        <></>
      )}
    </Tabs>
  );
};

export default TabHelper;
