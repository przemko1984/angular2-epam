import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import {
	HeaderComponent,
	LogoComponent,
	FooterComponent,
	ToolboxComponent
} from './components/';

@NgModule({
	declarations: [
		HeaderComponent,
		LogoComponent,
		FooterComponent,
		ToolboxComponent
	],
	imports: [RouterModule, FormsModule],
	exports: [
		HeaderComponent,
		LogoComponent,
		FooterComponent,
		ToolboxComponent
	]
})
export class CoreModule {
	constructor() {
	}
}
