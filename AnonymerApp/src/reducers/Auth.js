import { LOGIN, LOGOUT, REGISTER } from "../actions/Auth";

const initialState = {
    userData: null,
    isLogged: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { userData: action.user, isLogged: action.loggedIn };
        case LOGOUT:
            return { userData: action.user, isLogged: action.loggedIn };
        case REGISTER:
            return state;
        default:
            return initialState;
    }
};

export default authReducer;
