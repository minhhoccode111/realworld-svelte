/** @type {import('@sveltejs/kit').Handle} */
export function handle({ event, resolve }) {
	const jwt = event.cookies.get('jwt');

	try {
		event.locals.user = jwt ? JSON.parse(atob(jwt)) : null;
	} catch {}

	return resolve(event);
}
