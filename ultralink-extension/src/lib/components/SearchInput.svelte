<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	let searchTerm = "";
	function handleInput() {
		dispatch("search", searchTerm);
	}
</script>

<input type="text" bind:value={searchTerm} on:input={handleInput} placeholder="Search Anything you want to get back into..." class=" p-1 w-full text-white transition duration-300 rounded hover:bg-gray-800/80 bg-gray-800/50 focus:outline-none" />
