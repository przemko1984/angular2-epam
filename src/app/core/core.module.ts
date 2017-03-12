import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
	HeaderComponent,
	LogoComponent,
	FooterComponent
} from './components/';

@NgModule({
	declarations: [
		HeaderComponent,
		LogoComponent,
		FooterComponent
	],
	imports: [RouterModule],
	exports: [
		HeaderComponent,
		LogoComponent,
		FooterComponent
	]
})
export class CoreModule {
	constructor() {
	}
}
