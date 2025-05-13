import rootReducer from "../store/reducer/rootReducer";
import {thunk} from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import persistStore from "redux-persist/es/persistStore";

const reduxStore = () => {

    const store = createStore(rootReducer,applyMiddleware(thunk));
    const persistor = persistStore(store); 

    return {
       store,
       persistor 
    }
}

export default reduxStore;
