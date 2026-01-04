<script>
	import { enhance } from '$app/forms';
	import ListErrors from '$lib/ListErrors.svelte';
	import { toast } from 'svelte-sonner';

	const { form } = $props();
</script>

<svelte:head>
	<title>Sign in • Conduit</title>
</svelte:head>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign In</h1>
				<p class="text-xs-center">
					<a href="/register">Need an account?</a>
				</p>

				<!--TODO: display error properly-->
				<ListErrors errors={form?.errors} />

				<form
					method="POST"
					use:enhance={() => {
						return ({ result, update }) => {
							if (result.type === 'failure') {
								toast.error(result.data.error);
								update();
							}
						};
					}}
				>
					<fieldset class="form-group">
						<input
							class="form-control form-control-lg"
							name="email"
							type="email"
							required
							placeholder="Email"
						/>
					</fieldset>
					<fieldset class="form-group">
						<input
							class="form-control form-control-lg"
							name="password"
							type="password"
							required
							placeholder="Password"
						/>
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right" type="submit">Sign in</button>
				</form>
			</div>
		</div>
	</div>
</div>
