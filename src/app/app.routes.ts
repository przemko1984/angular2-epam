import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login';
import { CourseDetailsPageComponent } from './pages/course-details';
import { CourseListPageComponent } from './pages/course-list';
import { HomeComponent } from './pages/home';
import { NoContentComponent } from './pages/no-content';

export const ROUTES: Routes = [
	{path: '', component: HomeComponent},
	{path: 'login', component: LoginPageComponent},
	{path: 'list', component: CourseListPageComponent},
	{path: 'details', component: CourseDetailsPageComponent},
	{path: '**', component: NoContentComponent},
];
