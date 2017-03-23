// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// custom components
import { LoginPageComponent } from './login.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
	declarations: [
		LoginPageComponent
	],
	imports: [
		CommonModule,
		SharedModule
	],
	providers: []
})
export class LoginPageModule {
	constructor() {
	}
}
