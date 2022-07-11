<script lang="ts">
	export let visible = false;
</script>

{#if visible}
	<div class="backdrop" on:click={() => (visible = false)}>
		<div class="modal" on:click|stopPropagation>
			<slot />
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 10;
		cursor: pointer;
	}

	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		max-width: 30rem;
		height: 10rem;
		max-height: calc(100vh - 10rem);
		overflow: auto;
		background-color: #fff;
		border-radius: 0.5rem;
		padding: 1rem;
		z-index: 11;
	}
</style>
