import { Routes, CanActivate } from '@angular/router';
import { LoginPageComponent } from './pages/login';
import { CoursePageComponent } from './pages/course';
import { CourseDetailsPageComponent } from './pages/course-details';
import { CourseAddPageComponent } from './pages/course-add';
import { CourseListPageComponent } from './pages/course-list';
import { NoContentComponent } from './pages/no-content';
import { AuthGuard } from './shared/services';

export const ROUTES: Routes = [
	{path: '', redirectTo: '/courses', pathMatch: 'full' },
	{path: 'login', component: LoginPageComponent},
	{
		path: 'courses',
		component: CoursePageComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: CourseListPageComponent,
				data: {
					breadcrumb: 'Courses'
				}
			},
			{
				path: 'new',
				component: CourseAddPageComponent,
				data: {
					breadcrumb: 'New Course'
				}
			},
			{
				path: ':id',
				component: CourseAddPageComponent,
				data: {
					breadcrumb: 'Edit Course'
				}
			}
		]
	},
	{path: '**', component: NoContentComponent},
];
