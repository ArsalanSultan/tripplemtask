import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';


// reducers
interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: any | null;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};


const authReducer = (state = initialAuthState, action: any) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case 'LOGIN_FAILURE':
      return { ...state, isAuthenticated: false, loading: false, user: null };
    default:
      return state;
  }
};

// actions
const loginRequest = () => ({ type: 'LOGIN_REQUEST' });
const loginSuccess = (user: any) => ({ type: 'LOGIN_SUCCESS', payload: user });
const loginFailure = () => ({ type: 'LOGIN_FAILURE' });


export const login = (
  email: string,
  password: string
): ThunkAction<void, any, null, any> => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('http://localhost:8082/api/login', {
      email,
      password,
    });
    if (response.status === 200) {
      dispatch(loginSuccess(response.data.user));
      localStorage.setItem('user',JSON.stringify(response.data.user))
    } else {
      dispatch(loginFailure());
    }
  } catch (error) {
    console.log(error);
    dispatch(loginFailure());
  }
};


const rootReducer = combineReducers({
  auth: authReducer,
});


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
