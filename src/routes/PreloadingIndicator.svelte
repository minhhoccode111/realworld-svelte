<script>
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let visible = $state(false);
	let progress = new Tween(0, {
		duration: 5000,
		easing: cubicOut
	});

	onMount(() => {
		visible = true;
		progress.target = 0.85;
	});
</script>

{#if visible}
	<progress value={progress.current}></progress>
{/if}

<style>
	progress {
		border: none;
		height: 4px;
		display: block;
		width: 100%;
		background-color: #5cb85c;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
