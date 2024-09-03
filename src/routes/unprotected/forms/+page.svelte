<script lang="ts">
	import {
		Button,
		ButtonSet,
		TextArea,
		TextInput,
		Select,
		SelectItem
	} from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { KudoKind } from '$lib/types/kudos';
	import { addToast, ToastKind } from '$lib/client/Notifications';
	import List from '$lib/components/Kudos/List.svelte';

	export let data: PageData;

	const { form, enhance, errors, message } = superForm(data.form);

	$: kudos = data.kudos;
	$: if ($message) {
		// Add Toast
		addToast({
			title: $message,
			caption: new Date().toLocaleString(),
			kind: ToastKind.Success,
			hideCloseButton: true,
			timeout: 3000
		});
	}
</script>

<h1>Form validation and sveltekit actions</h1>
<p>Check out the code of this page, on how to work with form validation. This starter uses:</p>
<ul>
	<li><a href="https://zod.dev/">Zod</a></li>
	<li><a href="https://superforms.rocks/">Superforms</a></li>
</ul>
<h2>Kudo Example</h2>
<p>As an example of how to use form validation in sveltekit, with Kudos.</p>
<form use:enhance method="POST" action="?/createKudo" class="flex flex-col gap-4 max-w-md mt-4">
	<TextInput
		autocomplete="off"
		name="from"
		invalid={$errors.from ? true : false}
		invalidText={$errors.from?.at(0)}
		bind:value={$form.from}
		labelText="From"
		placeholder="Enter your name ..."
	/>
	<TextInput
		autocomplete="off"
		name="to"
		invalid={$errors.to ? true : false}
		invalidText={$errors.to?.at(0)}
		bind:value={$form.to}
		labelText="To"
		placeholder="Enter name of the person you want thank ..."
	/>
	<Select name="kind" labelText="Kudo Type" bind:selected={$form.kind}>
		{#each Object.entries(KudoKind) as typeOfKudo}
			<SelectItem value={typeOfKudo[1]} text={typeOfKudo[1]} />
		{/each}
	</Select>
	<TextArea
		autocomplete="off"
		name="message"
		invalid={$errors.message ? true : false}
		invalidText={$errors.message?.at(0)}
		bind:value={$form.message}
		labelText="Message"
		placeholder="Enter a message for the person ..."
	/>
	<ButtonSet class="fullWidth">
		<Button kind="primary" type="submit">Add Kudo</Button>
		<Button kind="secondary" type="reset">Reset</Button>
	</ButtonSet>
</form>
<List {kudos} />
