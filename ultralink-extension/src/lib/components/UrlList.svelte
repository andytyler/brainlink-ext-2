<script>
	import { createEventDispatcher } from "svelte";
	import { storage } from "../../storage.js";

	import UrlItem from "./UrlItem.svelte";
	export let urlList = [];
	export let searchTerm = "";
	export let sortOrder = "date";

	const dispatch = createEventDispatcher();
	$: filteredList = urlList.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.url.toLowerCase().includes(searchTerm.toLowerCase()));
	$: sortedList = [...filteredList].sort((a, b) => {
		if (sortOrder === "date") {
			return b.timestamp - a.timestamp;
		} else {
			return a.title.localeCompare(b.title);
		}
	});

	async function handleDelete(index) {
		urlList.splice(index, 1);
		urlList = urlList;
		await storage.set("urls", urlList);
		dispatch("notification", "URL deleted successfully!");
	}
</script>

<ul id="urlList" class=" space-y-1">
	{#if sortedList.length === 0}
		<li class="p-3 text-center text-gray-500">No URLs saved yet!</li>
	{:else}
		{#each sortedList as item, index (item.url)}
			<UrlItem {item} on:delete={() => handleDelete(index)} />
		{/each}
	{/if}
</ul>
