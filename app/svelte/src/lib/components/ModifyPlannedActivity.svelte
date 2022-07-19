<script lang="ts">
	import { modifyPlannedActivity, plannedActivities } from '$lib/stores/eventStore';

	import Button from './Button.svelte';
	import Input from './input/Input.svelte';
	import MultiSelect from './input/MultiSelect.svelte';
	import Select from './input/Select.svelte';
	import MultiDate from './input/MultiDate.svelte';
	import MultiTime from './input/MultiTime.svelte';

	import { Sun, LightningBolt, Briefcase } from 'svelte-hero-icons';

	let newActivity = $modifyPlannedActivity;
	$: dateStrings = newActivity?.activity.dates.map((act) => act.toString());
	$: timeStrings = newActivity?.activity.times.map(({ from, to }) => {
		return {
			from: from.round({ smallestUnit: 'minute' }).toString(),
			to: to.round({ smallestUnit: 'minute' }).toString()
		};
	});

	function handleSubmit() {
		if (!newActivity) return;

		if (newActivity.editMode) {
			plannedActivities.updateActivity(newActivity.activity);
		} else {
			plannedActivities.add(newActivity.activity);
		}

		modifyPlannedActivity.reset();
	}

	function destroyActivity() {
		if (newActivity?.editMode) {
			plannedActivities.deleteActivity(newActivity.activity);
		}

		modifyPlannedActivity.reset();
	}
</script>

{#if newActivity && $modifyPlannedActivity}
	<form on:submit|preventDefault={handleSubmit}>
		<h3 class="text-xl border-b border-b-black/50 border-solid mb-4 pb-2 capitalize">
			{newActivity.editMode ? 'Edit' : 'Create New'} activity
		</h3>

		<div class="flex gap-4 w-full">
			<div class="left grow">
				<Input type="text" label="title" bind:value={newActivity.activity.title} />

				<MultiDate
					{dateStrings}
					label="Enter possible dates"
					bind:dates={newActivity.activity.dates}
				/>
				<MultiTime
					{timeStrings}
					label="Enter possible times"
					bind:times={newActivity.activity.times}
				/>
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

		<div class="flex justify-end gap-4">
			<Button destructive on:click={destroyActivity}
				>{newActivity.editMode ? 'Remove' : 'Cancel'}</Button
			>
			<input
				class="bg-slate-100 hover:bg-slate-300 transition-colors px-3 py-2 rounded cursor-pointer"
				type="submit"
				on:click|preventDefault={handleSubmit}
				value="submit"
			/>
		</div>
	</form>
{/if}
