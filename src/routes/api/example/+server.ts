import { json } from '@sveltejs/kit';

export async function GET() {
	const message: string =
		'Authenticated API response. Everything under `/api` is protected through the handle hook under `hooks.server.ts`.';

	return json({
		status: 'ok',
		message
	});
}
