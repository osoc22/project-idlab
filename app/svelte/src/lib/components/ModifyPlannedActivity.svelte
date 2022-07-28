<script lang="ts">
	import { modifyPlannedActivity, plannedActivities } from '$lib/stores/eventStore';

	import Button from './Button.svelte';
	import Input from './input/Input.svelte';
	import MultiSelect from './input/MultiSelect.svelte';
	import Select from './input/Select.svelte';

	import { Sun, Briefcase } from 'svelte-hero-icons';

	let newActivity = $modifyPlannedActivity;
	let submitDisabled = true;

	function handleSubmit() {
		if (!newActivity) return;

		if (newActivity.editMode) {
			plannedActivities.updateActivity(newActivity.activity);
		} else {
			plannedActivities.add(
				newActivity.activity,
				newActivity.activity.date,
				newActivity.activity.time?.from,
				newActivity.activity.time?.to
			);
		}

		modifyPlannedActivity.reset();
	}

	function destroyActivity() {
		if (newActivity?.editMode) {
			plannedActivities.deleteActivity(newActivity.activity);
		}

		modifyPlannedActivity.reset();
	}

	function validateSubmit() {
		if (!newActivity) return (submitDisabled = true);

		if (
			!newActivity?.activity.date.toString() ||
			!newActivity?.activity.time?.from.toString() ||
			!newActivity?.activity.time?.to.toString()
		) {
			submitDisabled = true;
			return;
		}

		submitDisabled = false;
	}
	validateSubmit();
</script>

{#if newActivity && $modifyPlannedActivity}
	<form on:submit|preventDefault={handleSubmit}>
		<h3 class="text-xl border-b border-b-black/50 border-solid mb-4 pb-2 capitalize">
			{newActivity.editMode ? 'Edit' : 'Create New'} activity
		</h3>

		<div class="flex flex-col lg:flex-row gap-4 w-full">
			<div class="left grow">
				<Input type="text" label="title" bind:value={newActivity.activity.title} />

				<!-- <Date > -->
				<Input
					type="date"
					label="date *"
					value={newActivity.activity.date.toString()}
					on:change={(e) => {
						newActivity?.activity.setDate(e);
						validateSubmit();
					}}
				/>

				<!-- <Time {}> -->

				<Input
					type="time"
					label="from *"
					value={newActivity?.activity.time?.from.toString({ smallestUnit: 'minute' })}
					on:change={(e) => {
						newActivity?.activity.toZonedTime(e, 'from');
						validateSubmit();
					}}
				/>

				<Input
					type="time"
					label="to *"
					value={newActivity?.activity.time?.to.toString({ smallestUnit: 'minute' })}
					on:change={(e) => {
						newActivity?.activity.toZonedTime(e, 'to');
						validateSubmit();
					}}
				/>
			</div>
			<div class="right grow">
				<Input
					type="text"
					placeholder="Where?"
					label="Location"
					bind:value={newActivity.activity.location}
				/>

				<MultiSelect
					grow
					label="Get notified if there will be:"
					options={[
						{ title: 'Sun', icon: Sun },
						{ title: 'Cloudy' },
						{ title: 'Partly-cloudy' },
						{ title: 'Snow' }
					]}
					bind:value={newActivity.activity.notifyOnWeather}
				/>

				<Select
					grow
					label="Activity type:"
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
				class="bg-slate-100 disabled:text-slate-300 enabled:hover:bg-slate-300 transition-colors px-3 py-2 rounded cursor-pointer"
				type="submit"
				on:click|preventDefault={handleSubmit}
				value="submit"
				disabled={submitDisabled}
			/>
		</div>
	</form>
{/if}
