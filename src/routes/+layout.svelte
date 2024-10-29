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
	import { ThemeSwitcher } from '$lib/components';
	import '../app.css';
	import { Toasts } from '$lib/components';
	import { toasts } from '$lib/client/Notifications';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>IBM - SvelteKit</title>
</svelte:head>
<Toasts />
<Header href="/" company="IBM" platformName="MVP Name">
	<!-- @migration-task: migrate this slot by hand, `skip-to-content` is an invalid identifier -->
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
			<HeaderActionLink
				icon={Logout}
				on:click={() => {
					signOut();
					toasts.reset();
				}}
			/>
		{:else}
			<HeaderActionLink icon={Login} on:click={() => signIn()} />
		{/if}
	</HeaderUtilities>
</Header>
<Content>
	<Grid fullWidth>
		{@render children()}
	</Grid>
</Content>

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
