import { SvelteKitAuth } from '@auth/sveltekit';
import Keycloak from '@auth/core/providers/keycloak';
import { error, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { env } from '$env/dynamic/private';

const authentication: Handle = async ({ event, resolve }) => {
	// Protect any routes under /api, except /api/health
	if (event.url.pathname.startsWith('/api') && !event.url.pathname.startsWith('/api/health')) {
		const session = await event.locals.getSession();

		if (!session) {
			error(401, 'Unauthorized');
			// redirect(303, "/auth")
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
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
export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [
			Keycloak({
				clientId: env.KEYCLOAK_CLIENT_ID,
				clientSecret: env.KEYCLOAK_CLIENT_SECRET,
				issuer: env.KEYCLOAK_ISSUER
			})
		],
		secret: env.AUTH_SECRET,
		trustHost: true
	}),
	authentication,
	themeSetter
);
