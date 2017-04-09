import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import * as components from './components';
import * as services from './services';
import * as directives from './directives';
import * as pipes from './pipes';
import { FilterByNamePipe } from './pipes';

const modules = [
    CommonModule,
    FormsModule,
    RouterModule
];

const declarations = [components, directives, pipes].reduce(
    (_declarations, declaration) => _declarations.concat(
		Object.keys(declaration).map( (key) => declaration[key])),
    []
);

// Get only providers, not types or other objects
const providers = Object.keys(services)
					.map((key) => services[key])
                    .filter((provider) => {
                        return typeof provider === 'function';
                    });

@NgModule({
	declarations: declarations,
	imports: modules,
	exports: modules.concat(declarations),
    providers: [ FilterByNamePipe ]
})
export class SharedModule {

	static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: providers
        };
    }

	constructor() {
	}
}
