<h1>Welcome!</h1>
<h2>This is the landing page of the application!</h2>
<p>Is sample app shows you how to have</p>
<ul>
	<li>
		Unprotected routes like <a href="/unprotected">this one</a> which gets you to
		<code>/unprotected</code>
	</li>
	<li>
		<a href="\protected">Protected</a> routes which redirects to to <code>/</code> again and to
		<code>/protected</code>, when you are logged in.
	</li>
	<li>Complete protected API where the logic can be found in <code>+hooks.server.ts</code></li>
</ul>
<p>
	If you want the complete application to be secure it's maybe better to make exceptions paths in
	the <code>+hooks.server.ts</code> file or uncomment the content in <code>+page.server.ts</code> on
	the root level and redirect to a login page or other landing page which is not protected.
</p>

<style>
	p {
		margin-bottom: 1rem;
		margin-top: 0.5rem;
	}

	ul {
		margin-left: 2rem;
		list-style: circle;

		& li {
			line-height: 1.2rem;
		}
	}

	code {
		font-weight: bold;
	}
</style>
