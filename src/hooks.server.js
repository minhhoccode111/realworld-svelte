import { safeParse } from '$lib/utils';

/** @type {import('@sveltejs/kit').Handle} */
export function handle({ event, resolve }) {
	const jwt = event.cookies.get('jwt');
	event.locals.user = jwt ? safeParse(atob(jwt)) : null;

	return resolve(event);
}
