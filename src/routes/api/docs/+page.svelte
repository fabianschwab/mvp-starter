<script lang="ts">
	import { onMount } from 'svelte';
	import * as swaggerJson from './swagger.json';
	import SwaggerUI from 'swagger-ui';
	import 'swagger-ui/dist/swagger-ui.css';

	onMount(async () => {
		const swagger = SwaggerUI({
			spec: swaggerJson,
			dom_id: '#swagger-ui-container'
		});
	});
</script>

<svelte:head>
	<title>SwaggerUI</title>
</svelte:head>

<div id="swagger-ui-container"/>

<style>

</style>