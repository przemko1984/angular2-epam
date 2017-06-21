import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import { IAuth } from '../business-entities';
import { authReducer, coursesReducer, courseReducer,
    ICoursesReducer, ICourseReducer } from './';

export interface IAppStore {
  auth: IAuth;
  courses: ICourseReducer;
  course: ICourseReducer;
}

export default compose(combineReducers)({
    auth: authReducer,
    courses: coursesReducer,
    course: courseReducer
});
