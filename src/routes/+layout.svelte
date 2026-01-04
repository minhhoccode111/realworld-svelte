<script>
	import { navigating } from '$app/state';
	import favicon from '$lib/assets/favicon.ico';
	import Nav from './Nav.svelte';
	import PreloadingIndicator from './PreloadingIndicator.svelte';
	import { Toaster } from 'svelte-sonner';

	const { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if navigating.from}
	<PreloadingIndicator />
{/if}

<Toaster richColors closeButton expand={true} position="top-right" />

<Nav />

<main>
	{@render children()}
</main>
