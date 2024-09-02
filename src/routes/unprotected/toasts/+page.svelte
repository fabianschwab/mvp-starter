<script lang="ts">
	import { addToast, clearToasts, ToastKind, toasts } from '$lib/client/Notifications';

	import { Button, Modal, Select, SelectItem, TextInput, Toggle } from 'carbon-components-svelte';

	let kind: ToastKind = ToastKind.Info;
	let lowContrast: boolean = false;
	let timeout: number | undefined = undefined;
	let role: string | undefined = undefined;
	let title: string | undefined = 'Example toast title';
	let subtitle: string | undefined = undefined;
	let caption: string | undefined = undefined;
	let statusIconDescription: string | undefined = undefined;
	let closeButtonDescription: string | undefined = undefined;
	let hideCloseButton: boolean = false;
	let fullWidth: boolean = false;

	let open: boolean = false;

	function handleAdd() {
		if (hideCloseButton && !timeout) {
			open = true;
			return;
		}

		addToast({
			kind,
			lowContrast,
			timeout,
			role,
			title,
			caption,
			subtitle,
			statusIconDescription,
			closeButtonDescription,
			hideCloseButton,
			fullWidth
		});
	}

	function handleReset() {
		kind = ToastKind.Info;
		lowContrast = false;
		timeout = undefined;
		role = undefined;
		title = undefined;
		caption = undefined;
		subtitle = undefined;
		statusIconDescription = undefined;
		closeButtonDescription = undefined;
		hideCloseButton = false;
		fullWidth = false;
	}
</script>

<h1>Notification System</h1>
<p>
	There is a build in notification system based on the <a
		href="https://svelte.carbondesignsystem.com/components/ToastNotification#props"
		>Notification component</a
	> of the IBM Carbon Components for Svelte.
</p>
<p>By calling <code>addToast(toast:Toast)</code> you can easily add a Notification to the stack.</p>
<p>Notifications are also persisted in local storage to survive page reloads.</p>
<p>Click the button below to add a toast.</p>
<div class="grid lg:grid-cols-2 gap-4 mt-4">
	<div class="flex flex-col gap-4">
		<Select name="kind" bind:selected={kind} labelText="Type">
			<SelectItem value={ToastKind.Error} />
			<SelectItem value={ToastKind.Info} />
			<SelectItem value={ToastKind.InfoSquare} />
			<SelectItem value={ToastKind.Success} />
			<SelectItem value={ToastKind.Warning} />
			<SelectItem value={ToastKind.WarningAlt} />
		</Select>
		<TextInput name="role" bind:value={role} labelText="Role" placeholder="Enter a role..." />
		<TextInput
			name="timeout"
			bind:value={timeout}
			labelText="Timeout"
			type="number"
			placeholder="Enter a number in milliseconds..."
			helperText="When nothing is passed, the notification needs to be dismissed manually"
		/>
		<div class="flex">
			<Toggle name="lowContrast" labelText="Low contrast" bind:toggled={lowContrast} />
			<Toggle name="hideCloseButton" labelText="Hide Close Button" bind:toggled={hideCloseButton} />
			<Toggle name="fullWidth" labelText="Full Width" bind:toggled={fullWidth} />
		</div>
	</div>
	<div class="flex flex-col gap-4">
		<TextInput name="title" bind:value={title} labelText="Title" placeholder="Enter a title..." />
		<TextInput
			name="subtitle"
			bind:value={subtitle}
			labelText="Subtitle"
			placeholder="Enter a subtitle..."
		/>
		<TextInput
			name="caption"
			bind:value={caption}
			labelText="Caption"
			placeholder="Enter a caption..."
		/>
		<TextInput
			name="statusIconDescription"
			bind:value={statusIconDescription}
			labelText="Status Icon Description"
			placeholder="Enter a status icon description..."
		/>
		<TextInput
			name="closeButtonDescription"
			bind:value={closeButtonDescription}
			labelText="Close Button Description"
			placeholder="Enter a close button description..."
		/>
	</div>
	<Button kind="primary" on:click={handleAdd}>Add toast</Button>
	<Button kind="secondary" on:click={handleReset}>Reset Form</Button>
	<Button disabled={$toasts.length === 0} kind="danger" on:click={clearToasts}
		>Clear all {$toasts.length} notifications in the store</Button
	>
</div>
<Modal size="xs" bind:open modalHeading="Notification not added" passiveModal>
	<p>If you hide the close button, you need to set a timeout.</p>
	<p>
		Calling the <i>addToast</i> function without a timeout and a hidden close button will result in an
		error, because notifications are persisted in local storage.
	</p>
</Modal>
