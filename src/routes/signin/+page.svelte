<script lang="ts">
	import {
		PUBLIC_ENABLE_APPID,
		PUBLIC_ENABLE_CREDENTIAL,
		PUBLIC_ENABLE_KEYCLOAK
	} from '$env/static/public';
	import { addToast, ToastKind } from '$lib/client/Notifications';
	import { signIn } from '@auth/sveltekit/client';
	import { Button, TextInput } from 'carbon-components-svelte';
	import { IbmCloudAppId, Password, Unlocked } from 'carbon-icons-svelte';
	let password = '';

	function handleLogin() {
		signIn('credentials', { password: password.trim() });
		addToast({
			title: 'Signed in with shared user!',
			caption:
				'Shared users are not recommended, because of side effects when more real world users change data. Please use your own user account.',
			kind: ToastKind.Warning
		});
	}
</script>

<div class="flex flex-col justify-center gap-8 w-full items-center">
	<h1>Sign In to the MVP</h1>
	<img src="/cupcakes.jpeg" alt="ai-generated" class="w-1/3 image_preview_container" />
	<div class="flex flex-col gap-8">
		{#if PUBLIC_ENABLE_CREDENTIAL === 'true'}
			<div class="separator">Sign in with your password</div>
			<div class="flex flex-col gap-4 md:flex-row">
				<TextInput
					placeholder="Enter your password..."
					hideLabel
					bind:value={password}
					type="password"
					on:change={handleLogin}
				/>
				<Button size="field" kind="primary" icon={Unlocked} on:click={handleLogin}>Sign In</Button>
			</div>
		{/if}
		{#if PUBLIC_ENABLE_APPID === 'true' || PUBLIC_ENABLE_KEYCLOAK === 'true'}
			<div class="separator">Sign in with OAuth provider</div>
			<div class="flex flex-col gap-4">
				{#if PUBLIC_ENABLE_APPID === 'true'}
					<Button
						class="w-full"
						on:click={() => signIn('appid')}
						kind="secondary"
						icon={IbmCloudAppId}>Sign In with IBM AppId</Button
					>
				{/if}
				{#if PUBLIC_ENABLE_KEYCLOAK === 'true'}
					<Button
						class="w-full"
						on:click={() => signIn('keycloak')}
						kind="secondary"
						icon={Password}>Sign In with Keycloak</Button
					>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.image_preview_container {
		mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 50%, transparent 70%);
	}

	.separator {
		@apply flex items-center text-center text-sm;
	}

	.separator::before,
	.separator::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid var(--cds-text-01);
	}

	.separator:not(:empty)::before {
		margin-right: 0.25em;
	}

	.separator:not(:empty)::after {
		margin-left: 0.25em;
	}
</style>
