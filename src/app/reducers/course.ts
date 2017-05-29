import { Action, Reducer, Store } from '@ngrx/store';

import { ICourse } from '../business-entities';

export const COURSE_LOADED = 'COURSE_LOADED';
export const COURSE_SAVED = 'COURSE_SAVED';
export const COURSE_SAVE_FAILURE = 'COURSE_SAVE_FAILURE';
export const COURSE_LOAD_FAILURE = 'COURSE_LOAD_FAILURE';

export const INIT_COURSE = 'INIT_COURSE';

export interface ICourseReducer {
  course: ICourse;
  error: string;
}

const initialState: ICourseReducer = {
  course: {
			name: '',
			description: '',
			date: null,
			length: null,
			authors: []
	},
  error: null,
};

export const courseReducer = (state: ICourseReducer = initialState, action: Action = {type: INIT_COURSE}): ICourseReducer => {

  switch (action.type) {
    case COURSE_LOADED:
    case COURSE_SAVED:
      return Object.assign({}, state,
        {course: action.payload.course, error: null});

    case COURSE_SAVE_FAILURE:
    case COURSE_LOAD_FAILURE:
      return Object.assign({}, state, {error: action.payload.error});

    default:
      return Object.assign({}, initialState);
  }

};
