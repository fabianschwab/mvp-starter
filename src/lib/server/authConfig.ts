import { env } from '$env/dynamic/private';
import { SvelteKitAuth } from '@auth/sveltekit';

import Credentials from '@auth/sveltekit/providers/credentials';
import type { Provider } from '@auth/sveltekit/providers';
import { appId, credentials, keycloak } from '$lib/server/providersConfig';

const providers: Provider[] = [
	Credentials({
		credentials: { password: { label: 'Password', type: 'password' } },
		authorize(c) {
			if (c.password !== 'password') return null;
			return {
				id: 'test',
				name: 'Test User',
				email: 'test@example.com'
			};
		}
	})
];

export const providerMap = providers.map((provider) => {
	if (typeof provider === 'function') {
		const providerData = provider();
		return { id: providerData.id, name: providerData.name };
	} else {
		return { id: provider.id, name: provider.name };
	}
});

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

export const authConfig = SvelteKitAuth({
	providers: providersSelection(),
	secret: env.AUTH_SECRET,
	trustHost: true
});
