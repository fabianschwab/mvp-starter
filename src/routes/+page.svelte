<h1>Welcome!</h1>
<h2>This is the landing page of the application!</h2>
<p>Is sample app provides a simple way to get started with SvelteKit.</p>
<ul>
	<li>IBM Carbon Design <a href="https://svelte.carbondesignsystem.com/">Svelte Components</a></li>
	<li>Light and Dark mode</li>
	<li>
		<a href="/unprotected">Unprotected</a> routes, which are public available.
	</li>
	<li>
		<a href="/protected">Protected</a> routes which redirects you to <code>/auth/signin</code> when
		not logged in or to
		<code>/protected</code>, when you are logged in.
	</li>
	<li>
		Custom Login page with options for <code>IBM AppID</code>, <code>Keycloak</code> or
		<code>Credentials</code> prepared via <a href="https://authjs.dev/">AuthJS</a>.
	</li>
	<li>Complete protected API where the logic can be found in <code>+hooks.server.ts</code></li>
	<li>
		<a href="/unprotected/forms">Form validation</a> and how to work with
		<a href="https://zod.dev/">zod</a>, <a href="https://superforms.rocks/">superforms</a> and
		<a href="https://kit.svelte.dev/">SvelteKit actions</a>.
	</li>
	<li>
		Toast <a href="/unprotected/toasts">notification</a> system based on IBM Carbon Components
	</li>
	<li>
		<strong>WIP: </strong><a href="https://orm.drizzle.team/">Drizzle</a> ORM to connect to a database
		of your choice. As example sqlite is used to keep dependencies low.
	</li>
	<li><strong>WIP: </strong>User Settings</li>
</ul>
<p>
	If you want the complete application to be secure it's maybe better to make exceptions paths in
	the <code>+hooks.server.ts</code> file or uncomment the content in <code>+page.server.ts</code> on
	the root level and redirect to a login page or other landing page which is not protected.
</p>

<style>
	code {
		font-weight: bold;
	}
</style>
