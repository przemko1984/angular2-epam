import { Action, Reducer, Store } from '@ngrx/store';

import { ICourse } from '../business-entities';

export const COURSES_LOADING_IN_PROGRESS = 'COURSES_LOADING_IN_PROGRESS';
export const COURSES_LOADED = 'COURSES_LOADED';
export const COURSES_LOADING_FAILURE = 'COURSES_LOADING_FAILURE';
export const ALL_COURSES_LOADED = 'ALL_COURSES_LOADED';

export const INIT_COURSES = 'INIT_COURSES';

export interface ICoursesReducer {
  list: ICourse[];
  noMoreResults: boolean;
  loadedCounter: number;
  error: string;
}

const initialState: ICoursesReducer = {
  list: [],
  noMoreResults: false,
  loadedCounter: 0,
  error: null,
};

export const coursesReducer = (state: ICoursesReducer = initialState, action: Action = {type: INIT_COURSES}) => {

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

    case INIT_COURSES:
      return Object.assign({}, initialState);

    case COURSES_LOADING_FAILURE:
      return Object.assign({}, state, {error: action.payload.error});

    default:
      return state;
  }

};
