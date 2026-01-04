import { fail, redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (locals.user) redirect(307, '/');
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const body = await api.post('users/login', {
			user: {
				email: data.get('email'),
				password: data.get('password')
			}
		});

		if (body.error || !body.user) {
			return fail(401, body);
		}

		// TODO: redirect in a way that we can handle the event and show a greeting message for logged-in user
		const value = btoa(JSON.stringify(body.user));
		cookies.set('jwt', value, { path: '/' });

		redirect(307, '/');
	}
};
