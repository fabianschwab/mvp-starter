<script>
	import { ToastNotification } from 'carbon-components-svelte';
	import { toasts, dismissToast } from '$lib/client/Notifications';
</script>

{#if $toasts}
	<div class="fixed top-12 right-0 overflow-scroll z-50 toasts">
		{#each $toasts as toast (toast.id)}
			<ToastNotification
				on:close={() => {
					dismissToast(toast.id);
				}}
				{...toast.props}
			/>
		{/each}
	</div>
{/if}

<style>
	.toasts {
		min-height: max-content;
		max-height: calc(100vh - 4rem);
	}
</style>
