import { redirect, error, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authConfig } from '$lib/server/authConfig';
import { env } from '$env/dynamic/private';
const authentication: Handle = async ({ event, resolve }) => {
	/**
	 * All routes are protected by default
	 * If you want to make exceptions, make sure to add them here
	 *
	 * API is protected with bearer token
	 * Non API routes are protected over the session provided by the auth provider.
	 */

	// Exceptions (leave reason as comment why route should be public)
	/**
	 * "/": Landing page should be visible
	 * "/api/health" & "/api/health/ready": API health checks for kubernetes
	 * "/unprotected": for giving an example of a non protected route
	 */
	const exceptions = [
		'/',
		'/signin',
		'/signout',
		'/api/health',
		'/api/health/ready',
		'/unprotected',
		'/unprotected/toasts',
		'/unprotected/forms'
	];

	if (exceptions.includes(event.url.pathname)) {
		console.debug('DEBUG: ', `Route ${event.url.pathname} is public.`);
		return resolve(event);
	}

	// API
	if (event.url.pathname.startsWith('/api')) {
		console.debug('DEBUG: ', `Secure API route ${event.url.pathname} is called.`);
		const authHeader = event.request.headers.get('Authorization');

		if (!authHeader) {
			return error(401, 'Unauthorized');
		}

		const [, token] = authHeader.split(' ');
		if (!token || token !== env.API_SECRET) {
			return error(401, 'Unauthorized');
		}
		return resolve(event);
	}

	// Non API
	let session = await event.locals.auth();
	if (session) {
		console.debug('DEBUG: ', `Session protected route ${event.url.pathname} is called.`);
		return resolve(event);
	}

	// If user is not signed in or session is no longer valid, redirect to login for all other routes
	return redirect(303, '/auth/signin');
};

const themeSetter: Handle = async ({ event, resolve }) => {
	let theme = event.cookies.get('theme');

	if (!theme) {
		// Default theme when nothing set
		theme = 'g10';
	}
	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('theme=""', `theme="${theme}"`);
		}
	});
};

// First handle authentication
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(authConfig, authentication, themeSetter);
