<script lang="ts">
	export let data;
</script>

<h1>This is a protected route over this component.</h1>
<p>You see this, because you are logged in.</p>
<p>Your session data:</p>
<pre>{JSON.stringify(data, null, 2)}</pre>
<p>
	Note that nested paths (like: <code>/protected/example</code>) are not protected here. This is the
	<strong>per component</strong>
	authorization you see in the <code>README.md</code> file.
</p>
<p>
	If you want to protect entire paths, do it like the <strong>per path</strong> way. As example you
	can look at the
	<code>/api</code> path in the <code>+hooks.server.ts</code> file.
</p>

<style>
	pre {
		margin-top: 1rem;
		margin-bottom: 1rem;
		border: 1px solid;
		padding: 1rem;
		border-radius: 4px;
	}

	code {
		font-weight: bold;
	}
</style>
