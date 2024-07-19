<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	let sortOrder = "date";
	function handleChange() {
		dispatch("sort", sortOrder);
	}
</script>

<div class="flex flex-row relative text-gray-400 hover:text-purple-500 items-center font-semibold">
	<span class=" mdi mdi-sort"></span>
	<select bind:value={sortOrder} on:change={handleChange} class="max-w-xs p-1 text-xs transition duration-100 bg-inherit outline-none appearance-none">
		<option value="date">Latest</option>
		<option value="alpha">A-Z</option>
	</select>
	<span class=" mdi mdi-chevron-down pointer-events-none"></span>
</div>
