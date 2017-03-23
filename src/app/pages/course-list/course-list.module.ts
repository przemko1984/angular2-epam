// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

// custom components
import { CourseListPageComponent } from './course-list.component';
import { SharedModule } from './../../shared/shared.module';
import { CourseItemComponent } from './course-item';

@NgModule({
	declarations: [
		CourseListPageComponent,
		CourseItemComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		ConfirmationPopoverModule.forRoot({
			confirmButtonType: 'danger'
		}),
	],
	providers: []
})
export class CourseListPageModule {
	constructor() {
	}
}
