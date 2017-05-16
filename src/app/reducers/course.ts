import { Action, Reducer, Store } from '@ngrx/store';

import { ICourse } from '../business-entities';

export const COURSES_LOADING_IN_PROGRESS = 'COURSES_LOADING_IN_PROGRESS';
export const COURSES_LOADED = 'COURSES_LOADED';
export const COURSES_LOADING_FAILURE = 'COURSES_LOADING_FAILURE';
export const RESET_COURSES = 'RESET_COURSES';
export const ALL_COURSES_LOADED = 'ALL_COURSES_LOADED';

export const INIT_COURSE = 'INIT_COURSE';

export interface ICourseReducer {
  list: ICourse[];
  noMoreResults: boolean;
  loadedCounter: number;
  error: string;
}

const initialState: ICourseReducer = {
  list: [],
  noMoreResults: false,
  loadedCounter: 0,
  error: null,
};

export const courseReducer = (state: ICourseReducer = initialState, action: Action = {type: INIT_COURSE}) => {

  switch (action.type) {
    case COURSES_LOADED:
      const list = state.list.concat(action.payload.list);
      const loadedCounter = state.loadedCounter + 1;

      return Object.assign({}, state, {
          list: list,
          error: null,
          loadedCounter: loadedCounter,
          noMoreResults: list.length < (loadedCounter * 5)
        });

    case RESET_COURSES:
      return Object.assign({}, initialState);

    case COURSES_LOADING_FAILURE:
      return Object.assign({}, state, {error: action.payload.error});

    default:
      return state;
  }

};
