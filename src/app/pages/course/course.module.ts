// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// custom components
import { CoursePageComponent } from './course.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
	declarations: [
		CoursePageComponent
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	providers: []
})
export class CoursePageModule {
	constructor() {
	}
}
