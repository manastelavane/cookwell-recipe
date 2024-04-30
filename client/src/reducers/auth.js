import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null,isAuthenticated:false,error:null }, action) => {
  switch (action.type) {
    case actionType.AUTH_LOADING:
      return {...state,loading:true,isAuthenticated:false};
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false ,isAuthenticated:true,error:null};

    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, isAuthenticated:false,error:null};

    case actionType.UPDATE:
      return { ...state, loading: true ,isAuthenticated:true,error:null};

    case actionType.UPDATE_SUCCESS:
      let userdata=JSON.parse(localStorage.getItem('profile'))
      userdata.result.name=action.payload.name;
      userdata.result.selectedFile=action.payload.selectedFile;
      localStorage.clear();
      localStorage.setItem('profile', JSON.stringify({ ...userdata }));
      return { ...state, authData: userdata, loading: false,isAuthenticated:true };

    case actionType.G_SIGNIN_FAIL:
    case actionType.SIGNIN_FAIL:
    case actionType.SIGNUP_FAIL:
      return {...state,loading:false,isAuthenticated:false,error:action.payload}
    case actionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
