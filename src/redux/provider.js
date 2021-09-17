import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./rootReducer";

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log("Middleware", store.getState());
  return result;
};
const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

const ProviderBox = (props) =>{
  return <Provider store={store}>
    {props.children}
  </Provider>
}
export default ProviderBox;
