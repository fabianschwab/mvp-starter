<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { ChatBot } from 'carbon-icons-svelte';

	let webChatInstance;
	let showButton = true;
	let fullscreen = false;

	onMount(() => {
		window.watsonAssistantChatOptions = {
			integrationID: import.meta.env.VITE_WXA_INTEGRATIONID, // The ID of this integration.
			region: import.meta.env.VITE_WXA_REGION, // The region your integration is hosted in.
			serviceInstanceID: import.meta.env.VITE_WXA_SERVICEINSTANCEID, // The ID of your service instance.
			onLoad: onLoad,
			showLauncher: false,
			themeConfig: {
				useAITheme: false
			}
		};
		setTimeout(function () {
			const t = document.createElement('script');
			t.src =
				'https://web-chat.global.assistant.watson.appdomain.cloud/versions/' +
				(window.watsonAssistantChatOptions.clientVersion || 'latest') +
				'/WatsonAssistantChatEntry.js';
			document.head.appendChild(t);
		});
	});

	/**
	 * This is the function that is called when the web chat code has been loaded and it is ready to be rendered.
	 */
	async function onLoad(instance) {
		// Save a reference to the web chat instance so we can use it later.
		webChatInstance = instance;

		// Add listeners so we know when web chat has been opened or closed.
		// See https://web-chat.global.assistant.watson.cloud.ibm.com/docs.html?to=api-events#summary for more about our
		// events.
		instance.on({ type: 'view:change', handler: viewChangeHandler });

		await instance.render();

		// instance.updateCSSVariables({

		// 	'BASE-height': '100%',
		// 	'BASE-width': '90%'
		// });

		if (fullscreen) {
			instance.updateCustomMenuOptions([{ text: 'Exit Fullscreen', handler: toggleFullScreen }]);
		} else {
			instance.updateCustomMenuOptions([{ text: 'Fullscreen', handler: toggleFullScreen }]);
		}
	}

	function toggleFullScreen() {
		if (fullscreen) {
			fullscreen = false;
			webChatInstance.updateCustomMenuOptions([{ text: 'Fullscreen', handler: toggleFullScreen }]);
			webChatInstance.updateCSSVariables({
				'BASE-height': '640px',
				'BASE-width': '360px'
			});
		} else {
			fullscreen = true;
			webChatInstance.updateCustomMenuOptions([
				{ text: 'Exit Fullscreen', handler: toggleFullScreen }
			]);
			webChatInstance.updateCSSVariables({
				'BASE-height': '95vh',
				'BASE-width': '97vw',
				'BASE-max-height': '95vh',
				'BASE-max-width': '97vw'
			});
		}
	}

	/**
	 * This function is called after a view change has occurred. It will show or hide the launcher.
	 */
	function viewChangeHandler(event) {
		if (event.newViewState.mainWindow) {
			showButton = false;
		} else {
			showButton = true;
		}
	}

	/**
	 * This will be called when the user clicks the launcher button.
	 */
	function openMainWindow() {
		// See https://web-chat.global.assistant.watson.cloud.ibm.com/docs.html?to=api-instance-methods#changeview for
		// more information on this function.
		webChatInstance?.changeView('mainWindow');
	}
</script>

{#if showButton}
	<div class="chatButton">
		<Button icon={ChatBot} on:click={openMainWindow}>Start Chat</Button>
	</div>
{/if}

<style>
	.chatButton {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
	}
</style>
