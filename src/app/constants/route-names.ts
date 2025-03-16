export const routeNames = {
	disService: 'dis-service',
	myChildIsSoSmart: 'my-child-is-so-smart',
	derivedState: '',
	injectFunction: 'inject-function',
} as const;

export type RouteNames = (typeof routeNames)[keyof typeof routeNames];
