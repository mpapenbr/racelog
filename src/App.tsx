import "antd/dist/antd.css";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import "./App.css";
import AppHeader from "./components/appHeader";
import TabContainer from "./container/tabs/tabContainer";
import { ApplicationState } from "./stores";

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
}

const App: React.FC<AppProps> = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
          {/* <DevContainer /> */}
          <AppHeader />
          <TabContainer />

          {/* <RaceContainer /> */}
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
