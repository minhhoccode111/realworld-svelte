<script>
	import { enhance } from '$app/forms';

	const { article, user } = $props();
	let favorited = $state(article.favorited);
	let favoritesCount = $state(article.favoritesCount);
	let loading = $state(false);
</script>

<div class="article-preview">
	<div class="article-meta">
		<a href="/profile/@{article.author.username}">
			<img src={article.author.image} alt={article.author.username} />
		</a>
		<div class="info">
			<a class="author" href="/profile/@{article.author.username}">{article.author.username}</a>
			<span class="date">{new Date(article.createdAt).toDateString()}</span>
		</div>
		{#if user}
			<form
				method="POST"
				action="/article/{article.slug}?/toggleFavorite"
				use:enhance={() => {
					loading = true;
					// optimistic UI - now mutating local state
					if (favorited) {
						favorited = false;
						favoritesCount -= 1;
					} else {
						favorited = true;
						favoritesCount += 1;
					}
					return ({ result, update }) => {
						if (result.type === 'error') update();
						loading = false;
					};
				}}
				class="pull-xs-right"
			>
				<input hidden type="checkbox" name="favorited" checked={favorited} />
				<button
					class="btn btn-sm {favorited ? 'btn-primary' : 'btn-outline-primary'}"
					disabled={loading}
				>
					<i class="ion-heart"></i>
					{favoritesCount}
				</button>
			</form>
		{/if}
	</div>

	<a href="/article/{article.slug}" class="preview-link">
		<h1>{article.title}</h1>
		<p>{article.description}</p>
		<span>Read more...</span>
		<ul class="tag-list">
			{#each article.tagList as tag}
				<li class="tag-default tag-pill tag-outline">{tag}</li>
			{/each}
		</ul>
	</a>
</div>
