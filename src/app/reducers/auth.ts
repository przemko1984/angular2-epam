import { Action, Reducer, Store } from '@ngrx/store';

import { IAuth } from '../business-entities';

export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_INFO = 'USER_INFO';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';

export const INIT = 'INIT';

const initialState: IAuth = {
  error: null,
  token: null,
  current: null
};

export const authReducer = (state: IAuth = initialState, action: Action = {type: INIT}) => {

  switch (action.type) {
    case USER_AUTHENTICATED:
      return Object.assign({}, state,
        {token: action.payload.token, error: null});
    case USER_INFO:
      return Object.assign({}, state,
        {current: action.payload.user, error: null});

    case LOGOUT_USER:
      return Object.assign({}, initialState);

    case LOGIN_FAILURE:
      return Object.assign({}, state, {error: action.payload.error, token: null, current: null});

    default:
      return state;
  }

};
