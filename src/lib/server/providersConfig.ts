import {
	KEYCLOAK_CLIENT_ID,
	KEYCLOAK_CLIENT_SECRET,
	KEYCLOAK_ISSUER,
	APPID_CLIENT_ID,
	APPID_CLIENT_SECRET,
	APPID_DISCOVERYENDPOINT,
	APPID_OAUTHSERVERURL,
	CREDENTIAL_PASSWORD
} from '$env/static/private';
import type { Provider } from '@auth/core/providers';
import Keycloak from '@auth/core/providers/keycloak';
import Credentials from '@auth/sveltekit/providers/credentials';

export const appId: Provider = {
	id: 'appid',
	type: 'oidc',
	name: 'IBM AppID',
	clientId: APPID_CLIENT_ID,
	clientSecret: APPID_CLIENT_SECRET,
	issuer: APPID_OAUTHSERVERURL,
	authorization: {
		params: {
			scope:
				'openid appid_default appid_readuserattr appid_readprofile appid_writeuserattr appid_authenticated'
		}
	},
	wellKnown: APPID_DISCOVERYENDPOINT,
	profile(profile) {
		return {
			id: profile.sub,
			name: profile.name,
			email: profile.email
		};
	}
};

export const keycloak: Provider = Keycloak({
	clientId: KEYCLOAK_CLIENT_ID,
	clientSecret: KEYCLOAK_CLIENT_SECRET,
	issuer: KEYCLOAK_ISSUER
});

export const credentials: Provider = Credentials({
	credentials: { password: { label: 'Password', type: 'password' } },
	authorize(c) {
		if (c.password !== CREDENTIAL_PASSWORD) return null;
		return {
			id: 'id123',
			name: 'John Appleseed',
			email: 'john@appleseed.com'
		};
	}
});
