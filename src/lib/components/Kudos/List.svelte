<script lang="ts">
	import { AspectRatio } from 'carbon-components-svelte';
	import { KudoKind, type Kudo } from '$lib/types/kudos';
	import { enhance } from '$app/forms';

	import { TooltipIcon } from 'carbon-components-svelte';
	import { TrashCan } from 'carbon-icons-svelte';
	export let kudos: Kudo[] = [];

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
	function getKudoIcon(kind: KudoKind): string {
		switch (kind) {
			case KudoKind.GreatJob:
				return 'job.svg';
			case KudoKind.ThankYou:
				return 'thanks.svg';
			case KudoKind.WellDone:
				return 'done.svg';
			case KudoKind.Congrats:
				return 'congrats.svg';
			case KudoKind.TotallyAwesome:
				return 'awesome.svg';
			default:
				return 'default.svg';
		}
	}
</script>

<h2 class="my-4">Kudos</h2>
<div class="wrapper">
	{#if kudos.length === 0}
		<p>No Kudos</p>
	{/if}
	{#each kudos as kudo (kudo.id)}
		<AspectRatio ratio="16x9">
			<div class="header {getKudoClass(kudo.kind, 'background')}">
				{kudo.to}
			</div>
			<div class="kind {getKudoClass(kudo.kind, 'foreground')}">
				{kudo.kind}
			</div>
			<div class="content">
				{kudo.message}
				<object
					type="image/svg+xml"
					data={`/kudos/${getKudoIcon(kudo.kind)}`}
					title="icon"
					class="h-24 w-24 {getKudoClass(kudo.kind, 'foreground')}"
				/>
			</div>
			<div class="footer">
				<div>{kudo.from}</div>
				<div>{kudo.date.toLocaleString()}</div>
				<form use:enhance action="?/deleteKudo" method="POST">
					<input type="hidden" name="kudoId" value={kudo.id} />
					<button class="deleteIconButton" type="submit"
						><TooltipIcon tooltipText="Delete" icon={TrashCan}></TooltipIcon></button
					>
				</form>
			</div>
		</AspectRatio>
	{/each}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Butterfly+Kids&family=Lovers+Quarrel&family=New+Rocker&family=Peralta&family=Playwrite+CU:wght@100..400&display=swap');

	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 8rem;
	}

	.deleteIconButton {
		@apply bg-transparent border-none m-2 text-xs;
		color: var(--cds-text-inverse);
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
