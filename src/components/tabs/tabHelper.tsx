import { Tabs } from "antd";
import React from "react";
import ConnectionContainer from "../../container/connectionContainer";

interface IStateProps {}
interface IDispatchProps {}
type MyProps = IStateProps & IDispatchProps;
const { TabPane } = Tabs;

const TabHelper: React.FC<MyProps> = (props: MyProps) => {
  return (
    <Tabs type="card">
      <TabPane tab="Connection" key="Connection">
        <ConnectionContainer />
      </TabPane>
    </Tabs>
  );
};

export default TabHelper;
