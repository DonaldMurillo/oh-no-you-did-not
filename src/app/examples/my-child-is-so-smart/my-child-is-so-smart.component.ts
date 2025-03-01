import { Component } from '@angular/core';
import { JuniorComponent } from './junior/junior.component';

@Component({
	selector: 'app-my-child-is-so-smart',
	imports: [JuniorComponent],
	templateUrl: './my-child-is-so-smart.component.html',
	styleUrl: './my-child-is-so-smart.component.scss',
})
export class MyChildIsSoSmartComponent {}
