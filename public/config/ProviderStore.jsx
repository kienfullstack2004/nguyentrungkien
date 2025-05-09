import { Provider } from "react-redux";
import reduxStore from "./redux";

export const {  store } = reduxStore();

export const ProviderStore = ({ children }) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
};


