import { SvelteKitAuth } from '@auth/sveltekit';
import KeyCloak from '@auth/core/providers/keycloak';
import { error, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import {
	KEYCLOAK_CLIENT_ID,
	KEYCLOAK_CLIENT_SECRET,
	KEYCLOAK_ISSUER,
	AUTH_SECRET
} from '$env/static/private';

async function authentication({ event, resolve }) {
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
}

async function themeSetter({ event, resolve }) {
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
}

// First handle authentication
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [
			KeyCloak({
				clientId: KEYCLOAK_CLIENT_ID,
				clientSecret: KEYCLOAK_CLIENT_SECRET,
				issuer: KEYCLOAK_ISSUER
			})
		],
		secret: AUTH_SECRET,
		trustHost: true
	}),
	authentication,
	themeSetter
);
