<script>
	import { ToastNotification } from 'carbon-components-svelte';
	import { toasts, dismissToast } from '$lib/client/Notifications';
</script>

{#if $toasts}
	<div class="absolute top-12 right-1 overflow-scroll z-50 toasts">
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
		height: calc(100vh - 4rem);
	}
</style>
