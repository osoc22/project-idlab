<script lang="ts">
	export let firstname: string;
	export let lastname: string;

	$: lastnameSplit = lastname.split(' ');
</script>

<div
	class="rounded-full bg-green-600 text-green-100 h-12 w-12 flex items-center cursor-pointer"
	on:click
>
	<span class="w-full text-center">
		{firstname[0]}
		{lastnameSplit[lastnameSplit.length - 1][0]}
	</span>
</div>
