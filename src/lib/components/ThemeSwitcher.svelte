<script lang="ts">
	import type { CarbonTheme } from 'carbon-components-svelte/types/Theme/Theme.svelte';
	import { onMount } from 'svelte';
	import { HeaderActionLink } from 'carbon-components-svelte';
	import { Awake, Asleep } from 'carbon-icons-svelte';
	let theme: CarbonTheme;

	function handleTheme(newTheme: CarbonTheme) {
		theme = newTheme;
		window.localStorage.setItem('theme', newTheme);
		document.cookie = `theme=${newTheme}; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
		document.documentElement.setAttribute('theme', newTheme);
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			const setTheme = window.localStorage.getItem('theme');
			if (setTheme) {
				theme = setTheme;
			} else {
				// Default must be the same as in the hook
				window.localStorage.setItem('theme', 'g10');
				theme = 'g10';
			}
		}
	});
</script>

{#if theme === 'g10'}
	<HeaderActionLink icon={Asleep} on:click={() => handleTheme('g90')} />
{:else if theme === "g90"}
	<HeaderActionLink icon={Awake} on:click={() => handleTheme('g10')} />
{/if}
