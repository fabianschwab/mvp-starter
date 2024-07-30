import {
	KEYCLOAK_CLIENT_ID,
	KEYCLOAK_CLIENT_SECRET,
	KEYCLOAK_ISSUER,
	APPID_CLIENT_ID,
	APPID_CLIENT_SECRET,
	APPID_DISCOVERYENDPOINT,
	APPID_OAUTHSERVERURL
} from '$env/static/private';
import type { Provider } from '@auth/core/providers';
import Keycloak from '@auth/core/providers/keycloak';

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
