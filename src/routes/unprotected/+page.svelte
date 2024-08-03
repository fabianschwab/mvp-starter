<script lang="ts">
	import { addToast, ToastKind, toasts } from '$lib/client/Notifications';

	import { Button, Select, SelectItem, TextInput } from 'carbon-components-svelte';

	let title: string | undefined = undefined;
	let timeout: number | undefined = undefined;
	let selected = ToastKind.Info;
</script>

<h1>This is a non protected route.</h1>
<p>Everything here and in nested paths is accessible for everyone.</p>
<h2>Notification System</h2>
<p>
	There is a build in notification system based on the <a
		href="https://svelte.carbondesignsystem.com/components/ToastNotification#props"
		>Notification component</a
	> of the IBM Carbon Components for Svelte.
</p>
<p>By calling <code>addToast(toast:Toast)</code> you can easily add a Notification to the stack.</p>
<p>Click the button below to add a toast.</p>
<div class="flex flex-col gap-4 max-w-md">
	<TextInput bind:value={title} labelText="Title" placeholder="Enter a title..." />
	<TextInput
		bind:value={timeout}
		labelText="Timeout"
		type="number"
		placeholder="Enter a number in milliseconds..."
		helperText="When nothing is passed, the notification needs to be dismissed manually"
	/>
	<Select bind:selected labelText="Type">
		<SelectItem value={ToastKind.Error} />
		<SelectItem value={ToastKind.Info} />
		<SelectItem value={ToastKind.InfoSquare} />
		<SelectItem value={ToastKind.Success} />
		<SelectItem value={ToastKind.Warning} />
		<SelectItem value={ToastKind.WarningAlt} />
	</Select>
	<Button
		on:click={() => {
			addToast({ title, caption: Date(), kind: selected, timeout });
		}}>Toast</Button
	>
	<p>There are {$toasts.length} notifications in the store</p>
</div>

<style>
	h1,
	h2 {
		@apply mb-4;
	}

	p {
		@apply mb-8;
	}
</style>
