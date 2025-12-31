import { error } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';
import { safeParse } from './utils';

const base = 'http://localhost:8080/api/v1';

async function send({ method, path, data, token }) {
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	const res = await fetch(`${base}/${path}`, opts);
	const text = await res.text(); // guarantee to be '{...}'
	const parsed = safeParse(text);

	console.log('res belike: ', res);

	if (!res.ok) {
		toast(parsed.error);
	}
	return parsed;

	// everything except 2xx, will have shape like this: { "error": "string" }

	// throw error(res.status, parsed.error);
}

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}
