<script lang="ts">
	import { HeaderActionLink } from 'carbon-components-svelte';
	import { Awake, Asleep } from 'carbon-icons-svelte';
	import { persisted } from 'svelte-persisted-store';

	const theme = persisted<string>('theme', 'g10');

	$effect(() => {
		document.cookie = `theme=${$theme}; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
		document.documentElement.setAttribute('theme', $theme);
	});
</script>

{#if $theme === 'g10'}
	<HeaderActionLink icon={Asleep} on:click={() => ($theme = 'g90')} />
{:else}
	<HeaderActionLink icon={Awake} on:click={() => ($theme = 'g10')} />
{/if}
