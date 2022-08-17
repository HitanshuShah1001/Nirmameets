import { SET_USER,LOGOUT_USER } from "../Action/Actiontypes";

const initialState = {
    user:{
        email:'',
        Name:'',
        Department:'',
        token:'Dummy',
        isAuthenticated:false
    }
}

const NMReducer = (state = initialState,action) => {
    switch(action.type){
        case SET_USER:
            return {
                user:action.payload.user
            }
        case LOGOUT_USER:
            return {
                user:initialState.user
            };
        default:
            return state;
    }
}

export default NMReducer;