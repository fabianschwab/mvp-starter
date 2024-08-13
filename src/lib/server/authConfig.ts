import {
	PUBLIC_ENABLE_APPID,
	PUBLIC_ENABLE_CREDENTIAL,
	PUBLIC_ENABLE_KEYCLOAK
} from '$env/static/public';
import { AUTH_SECRET } from '$env/static/private';
import { SvelteKitAuth } from '@auth/sveltekit';

import type { Provider } from '@auth/sveltekit/providers';
import { appId, credentials, keycloak } from '$lib/server/providersConfig';

const providersSelection = (): Provider[] => {
	const providers: Provider[] = [];
	if (PUBLIC_ENABLE_KEYCLOAK === 'true') {
		console.info('INFO: ', 'KeyCloak configured as auth provider.');
		providers.push(keycloak);
	}
	if (PUBLIC_ENABLE_APPID === 'true') {
		console.info('INFO: ', 'AppID configured as auth provider.');
		providers.push(appId);
	}
	if (PUBLIC_ENABLE_CREDENTIAL === 'true') {
		console.info('INFO: ', 'Credentials configured as auth provider.');
		providers.push(credentials);
	}
	return providers;
};

const providers: Provider[] = providersSelection();

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: providers,
	secret: AUTH_SECRET,
	trustHost: true,
	pages: {
		signIn: '/signin'
	}
});
