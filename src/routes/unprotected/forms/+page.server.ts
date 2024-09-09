import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';
// import { KudoKind } from '$lib/types/kudos';
import { db } from '$lib/server/db';
import { Kudos } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Instead of writing the validation by yourself, we can use drizzle-zod extension
// https://orm.drizzle.team/docs/zod
// const createKudoSchema = z.object({
// 	kind: z.enum([
// 		KudoKind.Congrats,
// 		KudoKind.GreatJob,
// 		KudoKind.ThankYou,
// 		KudoKind.TotallyAwesome,
// 		KudoKind.WellDone
// 	]),
// 	from: z.string().min(3),
// 	to: z.string().min(3),
// 	message: z.string().min(10).max(100)
// });

const createKudoSchema = createInsertSchema(Kudos);

const deleteKudoSchema = z.object({
	kudoId: z.string().min(1, { message: 'Kudo ID is required' })
});

export const load: PageServerLoad = async () => {
	const createKudoForm = await superValidate(zod(createKudoSchema));
	const deleteKudoForm = await superValidate(zod(deleteKudoSchema));

	const kudos = await db.select().from(Kudos);

	return { createKudoForm, deleteKudoForm, kudos };
};

export const actions: Actions = {
	createKudo: async ({ request }) => {
		const form = await superValidate(request, zod(createKudoSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await db.insert(Kudos).values({
			kind: form.data.kind,
			from: form.data.from,
			to: form.data.to,
			message: form.data.message
		});

		return message(form, 'Kudo created successfully');
	},
	deleteKudo: async ({ request }) => {
		// Database delete or something else running server sided.
		const form = await superValidate(request, zod(deleteKudoSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const id = parseInt(form.data.kudoId);

		if (Number.isNaN(id)) {
			return fail(400, { form });
		}

		await db.delete(Kudos).where(eq(Kudos.id, id));

		return message(form, 'Kudo deleted successfully');
	}
};
