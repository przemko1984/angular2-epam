import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login';
import { CourseDetailsPageComponent } from './pages/course-details';
import { CourseAddPageComponent } from './pages/course-add';
import { CourseListPageComponent } from './pages/course-list';
import { NoContentComponent } from './pages/no-content';

export const ROUTES: Routes = [
	{path: '', redirectTo: '/courses', pathMatch: 'full' },
	{path: 'login', component: LoginPageComponent},
	{
		path: 'courses',
		component: CourseListPageComponent,
		// data: {
        //   breadcrumb: 'Courses'
        // }
	},
	{
		path: 'courses/new',
		component: CourseAddPageComponent,
		data: {
          breadcrumb: 'New Course'
        }
	},
	{
		path: 'courses/:id',
		component: CourseAddPageComponent,
		data: {
          breadcrumb: 'Edit Course'
        }
	},
	{path: '**', component: NoContentComponent},
];
