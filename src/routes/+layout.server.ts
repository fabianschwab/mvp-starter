import type { LayoutServerLoad } from './$types';

// Makes the session object available in all paths of the application
export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.auth()
	};
};
