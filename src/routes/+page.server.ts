// import { redirect } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ parent }) => {
// 	const { session } = await parent();
// 	if (!session?.user) throw redirect(303, '/unprotected');
// 	return { session };
// };
