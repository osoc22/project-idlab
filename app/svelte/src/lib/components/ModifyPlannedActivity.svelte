<script lang="ts">
	import { modifyPlannedActivity } from '$lib/stores/eventStore';
	import Input from './input/Input.svelte';
	import Button from './Button.svelte';
	import MultiSelect from './input/MultiSelect.svelte';
	import Select from './input/Select.svelte';
	import MultiDate from './input/MultiDate.svelte';

	import { Sun, LightningBolt, Briefcase } from 'svelte-hero-icons';

	let newActivity = $modifyPlannedActivity;
</script>

{#if newActivity && $modifyPlannedActivity}
	<form>
		<h3 class="text-xl border-b border-b-black/50 border-solid mb-4 pb-2 capitalize">
			{newActivity ? 'Edit' : 'Create'} activity
		</h3>

		<div class="flex gap-4 w-full">
			<div class="left grow">
				<Input type="text" label="title" bind:value={newActivity.activity.title} />

				<MultiDate label="Enter possible dates" />
			</div>
			<div class="right grow">
				<Input type="text" placeholder="Where?" label="Location" />

				<MultiSelect
					grow
					label="Get notified if it will"
					options={[
						{ title: 'Sun', icon: Sun },
						{ title: 'Windy' },
						{ title: 'Rain' },
						{ title: 'Snow' },
						{ title: 'Thunder', icon: LightningBolt }
					]}
					bind:value={newActivity.activity.notifyOnWeather}
				/>

				<Select
					grow
					label="Activity type"
					options={[
						{ title: 'Work', icon: Briefcase },
						{ title: 'Food' },
						{ title: 'Fun' },
						{ title: 'Workout' },
						{ title: 'Relax' }
					]}
					bind:value={newActivity.activity.actitityType}
				/>
			</div>
		</div>

		<Button
			on:click={() => {
				console.log(newActivity);
			}}>Submit</Button
		>
	</form>
{/if}
