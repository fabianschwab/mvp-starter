import { env } from '$env/dynamic/private';
import { SvelteKitAuth } from '@auth/sveltekit';

import type { Provider } from '@auth/sveltekit/providers';
import { appId, credentials, keycloak } from '$lib/server/providersConfig';

const providersSelection = (): Provider[] => {
	const providers: Provider[] = [];
	if (env.KEYCLOAK_CLIENT_ID && env.KEYCLOAK_CLIENT_SECRET && env.KEYCLOAK_ISSUER) {
		providers.push(keycloak);
	}
	if (env.APPID_CLIENT_ID && env.APPID_CLIENT_SECRET && env.APPID_OAUTHSERVERURL) {
		providers.push(appId);
	}
	if (providers.length === 0) {
		console.error('No auth providers configured. Fallback to credentials');
		providers.push(credentials);
	}
	return providers;
};

const providers: Provider[] = providersSelection();

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: providers,
	secret: env.AUTH_SECRET,
	trustHost: true,
	pages: {
		signIn: '/signin'
	}
});
