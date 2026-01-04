<script>
	const { errors } = $props();
</script>

{#if errors}
	{#if typeof errors === 'string'}
		<p class="error-messages">{errors}</p>
	{:else}
		<ul class="error-messages">
			{#each Object.keys(errors) as key}
				<li>{key}: {errors[key]}</li>
			{/each}
		</ul>
	{/if}
{/if}
