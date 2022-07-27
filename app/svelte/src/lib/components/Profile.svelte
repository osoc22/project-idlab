<script lang="ts">
	import userStore from '$lib/stores/userStore';

	export let firstname: string;
	export let lastname: string = '';

	$: lastnameSplit = lastname?.split(' ') || firstname.split(' ');

	async function logOut() {
		await userStore.signOut();
	}
</script>

<button
	class="flex items-center hover:bg-gray-200 rounded-xl px-2 py-2 transition-colors cursor-pointer"
	on:click={logOut}
>
	<div>
		<div
			class="rounded-full bg-green-700 text-green-100 h-8 w-8 flex items-center justify-center cursor-pointer"
		>
			<span class="leading-none p-2 text-sm"> SU </span>
		</div>
	</div>
	<div class="ml-3">
		<p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Welcome, Solid User</p>
	</div>
</button>
