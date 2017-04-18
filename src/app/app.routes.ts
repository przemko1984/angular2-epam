import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login';
import { CourseDetailsPageComponent } from './pages/course-details';
import { CourseAddPageComponent } from './pages/course-add';
import { CourseListPageComponent } from './pages/course-list';
import { NoContentComponent } from './pages/no-content';

export const ROUTES: Routes = [
	{path: '', component: CourseListPageComponent},
	{path: 'login', component: LoginPageComponent},
	{path: 'list', component: CourseListPageComponent},
	{path: 'edit/:id', component: CourseDetailsPageComponent},
	{path: 'add', component: CourseAddPageComponent},
	{path: '**', component: NoContentComponent},
];
