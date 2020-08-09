import React from "react";
import { useDispatch } from "react-redux";
import TabHelper from "../../components/tabs/tabHelper";

const TabContainer: React.FC = () => {
  const dispatch = useDispatch();

  const dispatchToProps = {
    // setDuration: useCallback((d: number) => dispatch(setDuration(d)), [dispatch]),
    // sagaTestDouble: useCallback((d: number) => dispatch(sagaTestDouble(d)), [dispatch]),
    // quickProposal: useCallback((param: ISimpleRaceProposalParam) => dispatch(computeQuickProposal(param)), [dispatch]),
  };
  return <TabHelper {...dispatchToProps} />;
};

export default TabContainer;
