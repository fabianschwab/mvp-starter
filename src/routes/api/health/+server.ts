import { json } from '@sveltejs/kit';

/*
 * Startup Probe
 * Sometimes, you have to deal with legacy applications that might require an additional startup time on their first initialization.
 * In such cases, it can be tricky to set up liveness probe parameters without compromising the fast response to deadlocks that motivated such a probe.
 * The trick is to set up a startup probe with the same command, HTTP or TCP check,
 * with a failureThreshold * periodSeconds long enough to cover the worst case startup time.
 *
 * Liveness Probe
 * Is used to check if the application can sill process requests
 */

export async function GET() {
	return json({
		status: 'up',
		uptime: process.uptime(),
		memory: process.memoryUsage()
	});
}
