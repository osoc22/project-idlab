<div class="login">
	<h1>Welcome to your calendar pod</h1>
	<div class="actions">
		<button class="signin" on:click={() => console.log('sign in')}>Sign in</button>
		<button class="register" on:click={() => console.log('register')}>Register</button>
	</div>
</div>

<style>
	.login {
		margin: 10rem auto;
		width: min-content;
	}

	.actions {
		display: flex;
		justify-content: space-between;
	}

	button {
		background: #fff;
		border: 1px solid #ccc;
		border-radius: 3px;
		color: #333;
		font-size: 1.2em;
		padding: 1em 2em;
		margin: 1rem 4rem;
		cursor: pointer;
	}
</style>
