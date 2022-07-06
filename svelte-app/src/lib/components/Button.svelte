<script lang="ts">
	export let filled = false;
</script>

<div class="button" class:filled on:click>
	<slot />
</div>

<style>
	.button {
		background: white;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		outline: 0 solid black;
		outline-offset: 0;
		transition: outline 0.25s;
	}

	.button.filled {
		background-color: #ccc;
	}

	.button:hover {
		outline-offset: 2px;
		outline-width: 2px;
	}
</style>
