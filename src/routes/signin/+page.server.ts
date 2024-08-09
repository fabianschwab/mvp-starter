import { signIn } from '$lib/server/authConfig';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
export const actions: Actions = { default: signIn };

export const load: PageServerLoad = async ({ locals }) => {
	let session = await locals.auth();
	if (session) {
		redirect(303, '/');
	}
};
