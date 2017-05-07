import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login';
import { CourseDetailsPageComponent } from './pages/course-details';
import { CourseAddPageComponent } from './pages/course-add';
import { CourseListPageComponent } from './pages/course-list';
import { NoContentComponent } from './pages/no-content';

export const ROUTES: Routes = [
	{path: '', redirectTo: '/courses', pathMatch: 'full' },
	{path: 'login', component: LoginPageComponent},
	{path: 'courses', component: CourseListPageComponent},
	{path: 'courses/new', component: CourseAddPageComponent},
	{path: 'courses/:id', component: CourseAddPageComponent},
	{path: '**', component: NoContentComponent},
];
