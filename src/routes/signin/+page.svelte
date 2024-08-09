<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { Button } from 'carbon-components-svelte';
	import { IbmCloudAppId, Password } from 'carbon-icons-svelte';
	let password = '';
</script>

<div class="flex flex-col justify-center gap-8 w-full items-center">
	<h1>Sign In to the MVP</h1>
	<img src="/cupcakes.jpeg" alt="ai-generated" class="w-1/3 image_preview_container" />
	<div>
		<Button on:click={() => signIn('appid')} icon={IbmCloudAppId}>Sign In with IBM AppId</Button>
		<Button on:click={() => signIn('keycloak')} kind="secondary" icon={Password}
			>Sign In with Keycloak</Button
		>
	</div>
</div>

<style>
	.image_preview_container {
		mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 50%, transparent 70%);
	}
</style>
