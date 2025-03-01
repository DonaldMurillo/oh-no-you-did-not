import { Routes } from '@angular/router';
import { DisServiceComponent } from './examples/dis-service/dis-service.component';
import { AppComponent } from './app.component';
import { routeNames } from './constants/route-names';
import { MyChildIsSoSmartComponent } from './examples/my-child-is-so-smart/my-child-is-so-smart.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: routeNames.disService,
		pathMatch: 'full',
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
		path: '**',
		redirectTo: routeNames.disService,
	},
];
