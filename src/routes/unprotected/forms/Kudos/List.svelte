<script lang="ts">
	import { AspectRatio } from 'carbon-components-svelte';
	import { KudoKind, kudos, removeKudo } from '../kudos';
	import Awesome from './Awesome.svelte';
	import Congrats from './Congrats.svelte';
	import Done from './Done.svelte';
	import Job from './Job.svelte';
	import Thanks from './Thanks.svelte';
</script>

<h2 class="my-4">Kudos</h2>
<div class="wrapper">
	{#if $kudos.length === 0}
		<p>No Kudos</p>
	{/if}
	{#each $kudos as kudo (kudo.id)}
		<AspectRatio ratio="16x9">
			<div role="button" class="kudoCard" on:click={() => removeKudo(kudo.id)}>
				{#if kudo.kind === KudoKind.ThankYou}
					<Thanks {kudo} />
				{:else if kudo.kind === KudoKind.GreatJob}
					<Job {kudo} />
				{:else if kudo.kind === KudoKind.Congrats}
					<Congrats {kudo} />
				{:else if kudo.kind === KudoKind.TotallyAwesome}
					<Awesome {kudo} />
				{:else if kudo.kind === KudoKind.WellDone}
					<Done {kudo} />
				{/if}
			</div>
		</AspectRatio>
	{/each}
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 2rem;
	}
	.kudoCard {
		@apply shadow-md hover:cursor-pointer;
		background-color: var(--cds-ui-01);
	}
</style>
