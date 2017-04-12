// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// custom components
import { CourseDetailsPageComponent } from './course-details.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
	declarations: [
		CourseDetailsPageComponent
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	providers: []
})
export class CourseDetailsPageModule {
	constructor() {
	}
}
