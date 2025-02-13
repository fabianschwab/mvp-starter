<script lang="ts">
	import { AspectRatio } from 'carbon-components-svelte';
	import { KudoKind } from '$lib/types/kudos';
	import Awesome from './Icons/Awesome.svelte';
	import Done from './Icons/Done.svelte';
	import Job from './Icons/Job.svelte';
	import Thanks from './Icons/Thanks.svelte';
	import Congrats from './Icons/Congrats.svelte';
	interface Props {
		kind: string;
		to: string;
		from: string;
		message: string;
		date: string;
		id: number;
		deleteButtonForm: any;
	}

	let { kind, to, from, message, date, id, deleteButtonForm }: Props = $props();

	function getKudoClass(kind: KudoKind, type: 'background' | 'foreground'): string {
		switch (kind) {
			case KudoKind.GreatJob:
				return `${type}-job`;
			case KudoKind.ThankYou:
				return `${type}-thanks`;
			case KudoKind.WellDone:
				return `${type}-done`;
			case KudoKind.Congrats:
				return `${type}-congrats`;
			case KudoKind.TotallyAwesome:
				return `${type}-awesome`;
			default:
				return '';
		}
	}
	function getKudoIcon(kind: KudoKind) {
		switch (kind) {
			case KudoKind.GreatJob:
				return Job;
			case KudoKind.ThankYou:
				return Thanks;
			case KudoKind.WellDone:
				return Done;
			case KudoKind.Congrats:
				return Congrats;
			case KudoKind.TotallyAwesome:
				return Awesome;
			default:
				return Awesome;
		}
	}
</script>

<AspectRatio ratio="16x9">
	<div class="header {getKudoClass(kind, 'background')}">
		{to}
	</div>
	<div class="kind {getKudoClass(kind, 'foreground')}">
		{kind}
	</div>
	{@const SvelteComponent = getKudoIcon(kind)}
	<div class="content">
		{message}
		<div class="min-h-24 min-w-24 max-h-24 max-w-24 {getKudoClass(kind, 'foreground')}">
			<SvelteComponent />
		</div>
	</div>
	<div class="footer">
		<div>{from}</div>
		<div>{date.toLocaleString()}</div>
		{@render deleteButtonForm(id)}
	</div>
</AspectRatio>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Butterfly+Kids&family=Lovers+Quarrel&family=New+Rocker&family=Peralta&family=Playwrite+CU:wght@100..400&display=swap');

	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 8rem;
	}

	.header {
		@apply p-2 text-sm text-center;
		color: var(--cds-text-inverse);
	}

	.kind {
		@apply p-2 pt-8 text-base text-center;
		background-color: var(--cds-ui-01);
	}
	.content {
		@apply flex justify-between p-4 text-base;
		background-color: var(--cds-ui-01);
	}

	.footer {
		@apply flex justify-between px-2 text-xs items-center;
		background-color: var(--cds-ui-03);
		color: var(--cds-icon-02);
	}

	.background-congrats {
		background-color: var(--cds-inverse-support-02);
	}

	.background-awesome {
		background-color: var(--cds-inverse-support-04);
	}

	.background-thanks {
		background-color: var(--cds-inverse-support-01);
	}

	.background-job {
		background-color: var(--cds-visited-link);
	}
	.background-done {
		background-color: var(--cds-inverse-support-03);
	}

	.foreground-congrats {
		@apply text-5xl;
		font-family: 'Butterfly Kids', cursive;
		color: var(--cds-inverse-support-02);
	}

	.foreground-awesome {
		@apply text-3xl;
		font-family: 'New Rocker', system-ui;
		color: var(--cds-inverse-support-04);
	}

	.foreground-thanks {
		@apply text-5xl;
		font-family: 'Lovers Quarrel', cursive;
		color: var(--cds-inverse-support-01);
	}

	.foreground-job {
		@apply text-2xl;
		font-family: 'Peralta', serif;
		color: var(--cds-visited-link);
	}
	.foreground-done {
		@apply text-2xl;
		font-family: 'Playwrite CU', cursive;
		color: var(--cds-inverse-support-03);
	}
</style>
