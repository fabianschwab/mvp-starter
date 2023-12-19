/**
 * Use this if you want to protect the whole application without showing anything.
 * Just immediately go to the login page.
 */

// import { redirect } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ parent }) => {
// 	const { session } = await parent();
// 	if (!session?.user) redirect(303, 'auth/signin');
// 	return { session };
// };
