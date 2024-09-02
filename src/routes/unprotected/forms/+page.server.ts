import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';
import { KudoKind, type Kudo } from './kudos';

const schema = z.object({
	kind: z.enum([
		KudoKind.Congrats,
		KudoKind.GreatJob,
		KudoKind.ThankYou,
		KudoKind.TotallyAwesome,
		KudoKind.WellDone
	]),
	from: z.string().min(3),
	to: z.string().min(3),
	message: z.string().min(10).max(100)
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));

	return { form: form };
};

export const actions: Actions = {
	createKudo: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// Database insert or something else running server sided.
		const kudo: Kudo = {
			id: crypto.randomUUID(),
			kind: form.data.kind as KudoKind,
			from: form.data.from,
			to: form.data.to,
			message: form.data.message,
			date: new Date()
		};

		return message(form, { text: 'Form submitted successfully', kudo });
	}
};
