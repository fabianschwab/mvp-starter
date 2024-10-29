<script lang="ts">
	import { Button, TextArea, TextInput, Select, SelectItem } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { KudoKind } from '$lib/types/kudos';
	import { addToast, ToastKind } from '$lib/client/Notifications';
	import { Kudo } from '$lib/components';

	import { TrashCan } from 'carbon-icons-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// Because we have multiple forms, we need to rename the imports to differing them
	// https://superforms.rocks/concepts/multiple-forms
	const {
		form: createKudoForm,
		enhance: createKudoEnhance,
		errors: createKudoErrors,
		message: createKudoMessage
	} = superForm(data.createKudoForm);

	const {
		form: deleteKudoForm,
		enhance: deleteKudoEnhance,
		errors: deleteKudoErrors,
		message: deleteKudoMessage
	} = superForm(data.deleteKudoForm);

	let kudos = $derived(data.kudos);

	$effect(() => {
		if ($createKudoMessage) {
			// Add Toast
			addToast({
				title: $createKudoMessage,
				caption: new Date().toLocaleString(),
				kind: ToastKind.Success,
				hideCloseButton: true,
				timeout: 3000
			});
		}
		if ($deleteKudoErrors && $deleteKudoErrors.kudoId) {
			// Add Toast
			addToast({
				title: $deleteKudoErrors.kudoId.at(0),
				caption: new Date().toLocaleString(),
				kind: ToastKind.Error,
				hideCloseButton: true,
				timeout: 3000
			});
		}
		if ($deleteKudoMessage) {
			// Add Toast
			addToast({
				title: $deleteKudoMessage,
				caption: new Date().toLocaleString(),
				kind: ToastKind.Success,
				hideCloseButton: true,
				timeout: 3000
			});
		}
	});
</script>

<h1>Form validation and sveltekit actions</h1>
<p>Check out the code of this page, on how to work with form validation. This starter uses:</p>
<ul class="default-list">
	<li><a href="https://zod.dev/">Zod</a></li>
	<li><a href="https://superforms.rocks/">Superforms</a></li>
</ul>
<h2>Kudo Example</h2>
<p>As an example of how to use form validation in sveltekit, with Kudos.</p>
<form
	use:createKudoEnhance
	method="POST"
	action="?/createKudo"
	class="flex flex-col gap-4 max-w-md mt-4"
>
	<TextInput
		autocomplete="off"
		name="from"
		invalid={$createKudoErrors.from ? true : false}
		invalidText={$createKudoErrors.from?.at(0)}
		bind:value={$createKudoForm.from}
		labelText="From"
		placeholder="Enter your name ..."
	/>
	<TextInput
		autocomplete="off"
		name="to"
		invalid={$createKudoErrors.to ? true : false}
		invalidText={$createKudoErrors.to?.at(0)}
		bind:value={$createKudoForm.to}
		labelText="To"
		placeholder="Enter name of the person you want thank ..."
	/>
	<Select name="kind" labelText="Kudo Type" bind:selected={$createKudoForm.kind}>
		{#each Object.entries(KudoKind) as typeOfKudo}
			<SelectItem value={typeOfKudo[1]} text={typeOfKudo[1]} />
		{/each}
	</Select>
	<TextArea
		autocomplete="off"
		name="message"
		invalid={$createKudoErrors.message ? true : false}
		invalidText={$createKudoErrors.message?.at(0)}
		bind:value={$createKudoForm.message}
		labelText="Message"
		placeholder="Enter a message for the person ..."
	/>
	<Button kind="primary" type="submit">Add Kudo</Button>
	<Button kind="secondary" type="reset">Reset</Button>
</form>

<h2 class="my-4">Kudos</h2>
<div class="wrapper">
	{#if kudos.length === 0}
		<p>No Kudos</p>
	{:else}
		{#each kudos as kudo}
			<Kudo {...kudo}>
				{#snippet deleteButtonForm(id: string)}
					<form {id} use:deleteKudoEnhance action="?/deleteKudo" method="POST">
						<input type="hidden" name="kudoId" value={id} />
						<Button
							kind="ghost"
							type="submit"
							size="small"
							tooltipPosition="top"
							iconDescription="Delete Kudo"
							icon={TrashCan}
						/>
					</form>
				{/snippet}
			</Kudo>
		{/each}
	{/if}
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 8rem;
	}
</style>
