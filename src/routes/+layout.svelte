<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import {
		Header,
		HeaderUtilities,
		SkipToContent,
		Content,
		HeaderAction,
		HeaderPanelLinks,
		HeaderPanelLink,
		HeaderActionLink,
		HeaderPanelDivider,
		Grid
	} from 'carbon-components-svelte';
	import { Logout, UserAvatar, Login } from 'carbon-icons-svelte';
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { ThemeSwitcher, Chat } from '$lib/components';
	import '../app.css';
</script>

<svelte:head>
	<title>IBM - SvelteKit</title>
</svelte:head>

<Header href="/" company="IBM" platformName="MVP Name">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<ThemeSwitcher />
		{#if $page.data.session}
			<HeaderAction icon={UserAvatar}>
				<div class="welcome">Welcome</div>
				<div class="user">{$page.data.session.user?.name}</div>
				<HeaderPanelLinks>
					<HeaderPanelDivider>Settings</HeaderPanelDivider>
					<HeaderPanelLink href="/">Example Entry</HeaderPanelLink>
				</HeaderPanelLinks>
			</HeaderAction>
			<HeaderActionLink icon={Logout} on:click={() => signOut()} />
		{:else}
			<HeaderActionLink icon={Login} on:click={() => signIn(import.meta.env.VITE_AUTH_PROVIDER)} />
		{/if}
	</HeaderUtilities>
</Header>
<Content>
	<Grid fullWidth>
		<slot />
	</Grid>
</Content>
{#if $page.data.session}
	<Chat />
{/if}

<style>
	.user {
		margin-left: 1rem;
		font-size: x-large;
	}
	.welcome {
		margin-top: 1rem;
		margin-left: 1rem;
	}
</style>
