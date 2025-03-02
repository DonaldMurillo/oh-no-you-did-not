import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routeNames } from '../constants/route-names';

interface NavItem {
	path: string;
	label: string;
}

@Component({
	selector: 'app-header-nav',
	standalone: true,
	imports: [CommonModule, RouterModule],
	template: `
		<header class="header">
			<div class="logo">Logo</div>

			<nav class="main-nav">
				@for (item of headerNav(); track item.path) {
				<a
					[routerLink]="item.path"
					routerLinkActive="active"
					class="nav-link"
				>
					{{ item.label }}
				</a>
				}
			</nav>
		</header>
	`,
	styles: [
		`
			.header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 1rem;
				background: #fff;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			}

			.logo {
				font-size: 1.5rem;
				font-weight: bold;
			}

			.main-nav {
				display: flex;
				gap: 1rem;
			}

			.nav-link {
				text-decoration: none;
				color: #333;
				padding: 0.5rem 1rem;
				border-radius: 4px;
				transition: background-color 0.3s;
			}

			.nav-link:hover,
			.nav-link.active {
				background-color: #f0f0f0;
			}
		`,
	],
})
export class HeaderNavComponent {
	readonly headerNav = signal<NavItem[]>([
		{
			path: routeNames.derivedState, // add new route item here
			label: 'Home',
		},
		{
			path: routeNames.disService,
			label: 'Dis Service',
		},
		{
			path: routeNames.myChildIsSoSmart,
			label: 'My Child Is So Smart',
		},
	]);
}
