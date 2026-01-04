import { toast } from 'svelte-sonner';
import { safeParse } from './utils';

// const base = 'https://api.realworld.show/api';
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
	const text = await res.text();
	const parsed = safeParse(text);

	if (!res.ok) {
		if (res.status >= 500) {
			toast.error('Something went wrong. Please try again.');
		} else {
			toast.error(parsed.error);
		}
	}
	return parsed;
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
