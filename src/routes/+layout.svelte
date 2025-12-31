<script>
	import { navigating } from '$app/state';
	import favicon from '$lib/assets/favicon.ico';
	import Nav from './Nav.svelte';
	import PreloadingIndicator from './PreloadingIndicator.svelte';

	const { children } = $props();
	import { Toaster } from 'svelte-sonner';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if navigating.from}
	<PreloadingIndicator />
{/if}

<Toaster position="bottom-right" expand={true} richColors closeButton />

<Nav />

<main>
	{@render children()}
</main>
