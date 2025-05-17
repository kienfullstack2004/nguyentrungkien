import authReducer from './authReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { AnyAction, combineReducers, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key:'auth',
    whitelist:["isLoggedIn","token"]
};

const rootReducer = combineReducers({
    auth:persistReducer(authConfig,authReducer)
});


export default rootReducer;