// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// custom components
import { CourseAddPageComponent } from './course-add.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
	declarations: [
		CourseAddPageComponent
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	providers: []
})
export class CourseAddPageModule {
	constructor() {
	}
}
