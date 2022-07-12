<script lang="ts">
	export let firstname: string;
	export let lastname: string;

	$: lastnameSplit = lastname.split(' ');
</script>

<div class="profile">
	<span>{firstname[0]} {lastnameSplit[lastnameSplit.length - 1][0]}</span>
</div>

<style>
	.profile {
		height: 3rem;
		width: 3rem;
		background: var(--primary-color);
		color: var(--primary-text);
		display: flex;
		align-items: center;
		border-radius: 50%;
		cursor: pointer;
	}

	span {
		width: 100%;
		text-align: center;
	}
</style>
