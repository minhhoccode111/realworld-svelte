<script>
	const { data } = $props();
</script>

<div class="container page">
	<div class="row">
		<div class="col-md-12">
			<h1>Test Preloader Page</h1>
			<p>This page loaded after a 3-second delay.</p>
			<p>Message from server: {data.message}</p>
		</div>
	</div>
</div>
