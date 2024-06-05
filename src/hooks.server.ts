import { SvelteKitAuth } from '@auth/sveltekit';
import Keycloak from '@auth/core/providers/keycloak';
import { error, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { env } from '$env/dynamic/private';
import type { Provider } from '@auth/core/providers';

const providersSelection = (): Provider[] => {
	if (env.VITE_AUTH_PROVIDER === 'appid') {
		return [
			{
				id: 'appid',
				type: 'oidc',
				name: 'IBM AppID',
				clientId: env.APPID_CLIENT_ID,
				clientSecret: env.APPID_CLIENT_SECRET,
				issuer: env.APPID_OAUTHSERVERURL,
				authorization: {
					params: {
						scope:
							'openid appid_default appid_readuserattr appid_readprofile appid_writeuserattr appid_authenticated'
					}
				},
				wellKnown: env.APPID_DISCOVERYENDPOINT,
				profile(profile) {
					return {
						id: profile.sub,
						name: profile.name,
						email: profile.email
					};
				}
			}
		];
	} else {
		return [
			Keycloak({
				clientId: env.KEYCLOAK_CLIENT_ID,
				clientSecret: env.KEYCLOAK_CLIENT_SECRET,
				issuer: env.KEYCLOAK_ISSUER
			})
		];
	}
};

const authentication: Handle = async ({ event, resolve }) => {
	// Protect any routes under /api, except /api/health
	if (event.url.pathname.startsWith('/api') && !event.url.pathname.startsWith('/api/health')) {
		const session = await event.locals.auth();

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
		providers: providersSelection(),
		secret: env.AUTH_SECRET,
		trustHost: true
	}),
	authentication,
	themeSetter
);
