import { Component } from '@angular/core';
import { injectNotAService } from './not-a-service/not-a-service.service';

@Component({
	selector: 'app-dis-service',
	imports: [],
	templateUrl: './dis-service.component.html',
	styleUrl: './dis-service.component.scss',
})
export class DisServiceComponent {
	notAService = injectNotAService();
}
