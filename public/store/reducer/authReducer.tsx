import { actionType } from "../action/actionType";
import { ActionAuth } from "../../utils/type";
const { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } = actionType;
export const initState = {
    isLoggedIn: false,
    token: null
}



const authReducer = (state = initState, action: ActionAuth ) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action?.access_token
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                token: null
            }

        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null
            }


        default:
            return state
    }
}

export default authReducer;