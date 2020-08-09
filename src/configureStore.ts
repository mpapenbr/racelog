// `react-router-redux` is deprecated, so we use `connected-react-router`.
// This provides a Redux middleware which connects to our `react-router` instance.
import { routerMiddleware } from "connected-react-router";
// If you use react-router, don't forget to pass in your history type.
import { History } from "history";
import { applyMiddleware, createStore, Store } from "redux";
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { ApplicationState, createRootReducer, rootSaga } from "./stores";

export default function configureStore(history: History, initialState: ApplicationState): Store<ApplicationState> {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});
  // create the redux-saga middleware
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
