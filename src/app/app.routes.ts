import { Routes } from '@angular/router';
import { DisServiceComponent } from './examples/dis-service/dis-service.component';
import { routeNames } from './constants/route-names';
import { MyChildIsSoSmartComponent } from './examples/my-child-is-so-smart/my-child-is-so-smart.component';
import { DerivedStateComponent } from './examples/state/derived-state/derived-state.component';
import { InjectFunctionComponent } from './examples/inject-function/inject-function.component';

export const routes: Routes = [
	{
		path: '',
		component: DerivedStateComponent,
	},
	{
		path: routeNames.disService,
		component: DisServiceComponent,
	},
	{
		path: routeNames.myChildIsSoSmart,
		component: MyChildIsSoSmartComponent,
	},
	{
		path: routeNames.injectFunction,
		component: InjectFunctionComponent,
	},
	{
		path: '**',
		redirectTo: routeNames.disService,
	},
];
