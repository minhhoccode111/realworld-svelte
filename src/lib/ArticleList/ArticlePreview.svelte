<script>
	import { enhance } from '$app/forms';

	const { article: initialArticle, user } = $props();
	let loading = $state(false);
	let article = $state({ ...initialArticle });
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
					// optimistic UI
					if (article.favorited) {
						article.favorited = false;
						article.favoritesCount -= 1;
					} else {
						article.favorited = true;
						article.favoritesCount += 1;
					}

					return ({ result, update }) => {
						loading = false;
						if (result.type === 'error') update();
					};
				}}
				class="pull-xs-right"
			>
				<input hidden type="checkbox" name="favorited" checked={article.favorited} />
				<button
					disabled={loading}
					class="btn btn-sm {article.favorited ? 'btn-primary' : 'btn-outline-primary'}"
				>
					<i class="ion-heart"></i>
					{#if loading}
						...
					{:else}
						{article.favoritesCount}
					{/if}
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
