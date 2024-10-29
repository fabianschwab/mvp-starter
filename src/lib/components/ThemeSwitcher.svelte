<script lang="ts">
	import { onMount } from 'svelte';
	import { HeaderActionLink } from 'carbon-components-svelte';
	import { Awake, Asleep } from 'carbon-icons-svelte';

	let theme: string = $state('');

	function handleTheme(newTheme: string) {
		theme = newTheme;
		localStorage.setItem('theme', newTheme);
		document.cookie = `theme=${newTheme}; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
		document.documentElement.setAttribute('theme', newTheme);
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			const setTheme = localStorage.getItem('theme');
			if (setTheme) {
				theme = setTheme;
			} else {
				// Default must be the same as in the hook
				localStorage.setItem('theme', 'g10');
				theme = 'g10';
			}
		}
	});
</script>

{#if theme === 'g10'}
	<HeaderActionLink icon={Asleep} on:click={() => handleTheme('g90')} />
{:else if theme === 'g90'}
	<HeaderActionLink icon={Awake} on:click={() => handleTheme('g10')} />
{/if}
