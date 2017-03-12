// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// custom components
import { CourseListPageComponent } from './course-list.component';
import { CoreModule } from './../../core/core.module';

@NgModule({
	declarations: [
		CourseListPageComponent
	],
	imports: [CoreModule],
	providers: []
})
export class CourseListPageModule {
	constructor() {
	}
}
