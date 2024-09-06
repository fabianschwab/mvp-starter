import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';
import { KudoKind, type Kudo } from '$lib/types/kudos';

let kudos: Kudo[] = [];

const createKudoSchema = z.object({
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

const deleteKudoSchema = z.object({
	kudoId: z.string().min(1, { message: 'Kudo ID is required' })
});

export const load: PageServerLoad = async () => {
	const createKudoForm = await superValidate(zod(createKudoSchema));
	const deleteKudoForm = await superValidate(zod(deleteKudoSchema));

	// Database select or something else running server sided.
	return { createKudoForm, deleteKudoForm, kudos };
};

export const actions: Actions = {
	createKudo: async ({ request }) => {
		const form = await superValidate(request, zod(createKudoSchema));

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

		kudos.push(kudo);

		return message(form, 'Kudo created successfully');
	},
	deleteKudo: async ({ request }) => {
		// Database delete or something else running server sided.
		const form = await superValidate(request, zod(deleteKudoSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		kudos = kudos.filter((kudo) => kudo.id !== form.data.kudoId);

		return message(form, 'Kudo deleted successfully');
	}
};
