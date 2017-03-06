import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
	HeaderComponent,
	LogoComponent,
	LoginComponent,
	FooterComponent
} from './components/';

@NgModule({
	declarations: [
		HeaderComponent,
		LogoComponent,
		LoginComponent,
		FooterComponent
	],
	imports: [RouterModule],
	exports: [
		HeaderComponent,
		LogoComponent,
		LoginComponent,
		FooterComponent
	]
})
export class CoreModule {
	constructor() {
	}
}
