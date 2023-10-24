<script>
	import 'carbon-components-svelte/css/all.css';
	import {
		Theme,
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
	import { Logout, Awake, Asleep, UserAvatar, Login } from 'carbon-icons-svelte';
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	/**
	 * Represents the active carbon theme
	 * @type {string}
	 */
	let theme = 'g10';

	/**
	 * The new carbon theme to switch to
	 * @param {string} mode
	 */
	function handleTheme(mode) {
		theme = mode;
	}
</script>

<Theme bind:theme persist persistKey="__carbon-theme" />

<Header href="/" company="IBM" platformName="MVP Name">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		{#if theme === 'g10'}
			<HeaderActionLink icon={Asleep} on:click={() => handleTheme('g90')} />
		{:else}
			<HeaderActionLink icon={Awake} on:click={() => handleTheme('g10')} />
		{/if}
		{#if $page.data.session}
			<HeaderAction icon={UserAvatar}>
				<HeaderPanelLinks>
					<HeaderPanelDivider>Settings</HeaderPanelDivider>
					<HeaderPanelLink href="/">Example Entry</HeaderPanelLink>
				</HeaderPanelLinks>
			</HeaderAction>
			<HeaderActionLink icon={Logout} on:click={() => signOut()} />
		{:else}
			<HeaderActionLink icon={Login} on:click={() => signIn('keycloak')} />
		{/if}
	</HeaderUtilities>
</Header>

<Content>
	<Grid fullWidth>
		<slot />
	</Grid>
</Content>
