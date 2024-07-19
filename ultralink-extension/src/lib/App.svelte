<script>
	import { onMount, onDestroy } from "svelte";
	import UrlList from "./components/UrlList.svelte";
	import SearchInput from "./components/SearchInput.svelte";
	import SortSelect from "./components/SortSelect.svelte";
	import { storage } from "../storage.js";
	import browserAPI from "../browserAPI.js";

	$: urlList = [];
	let searchTerm = "";
	let sortOrder = "date";

	function messageListener(message) {
		if (message.action === "urlUpdated") {
			console.log("Received urlUpdated message", message);
			urlList = [...message.urls];
		}
	}

	onMount(async () => {
		await loadUrls();
		browserAPI.runtime.onMessage.addListener(messageListener);
	});

	onDestroy(() => {
		browserAPI.runtime.onMessage.removeListener(messageListener);
	});

	async function loadUrls() {
		console.log("loadUrls function called");
		urlList = [...((await storage.get("urls")) || [])]; // Create a new array
		console.log("Loaded URLs:", urlList);
	}

	async function saveUrls() {
		console.log("Saving URLs:", urlList);
		await storage.set("urls", urlList);
	}

	function handleSearch(event) {
		searchTerm = event.detail;
	}

	function handleSort(event) {
		sortOrder = event.detail;
	}

	function addTestUrl() {
		urlList = [...urlList, { url: "https://example.com", title: "Test URL", date: new Date().toISOString() }];
		saveUrls();
	}
</script>

<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.5.95/css/materialdesignicons.min.css" rel="stylesheet" />

<main class="flex flex-col gap-2 w-full min-h-screen text-white max-w-screen bg-gradient-to-br from-gray-100 to-gray-200 p-1">
	<div class=" w-full px-1 mx-auto placeholder-gray-400">
		<div class="flex flex-row justify-between items-center">
			<h1>
				<span class="text-2xl">🧠</span>
				<span
					class="mb-1 text-lg mr-auto font-bold text-center text-transparent bg-clip-text bg-gradient-to-r
			from-blue-400 via-purple-500 to-pink-500">
					BrainLink Pro 2
				</span>
				<span class="text-xs text-gray-300/50 ml-auto"> v0.0.1 </span>
			</h1>
			<button on:click={loadUrls} class="bg-gray-500 hover:bg-gray-700 text-white font-bold p-1 rounded text-sm transition duration-300 ease-in-out mdi mdi-refresh"></button>
		</div>
		<div class="flex justify-right space-x-2">
			<!-- <button on:click={addTestUrl} class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded text-sm transition duration-300 ease-in-out"> Add Test URL </button> -->
		</div>
		<div class=" flex flex-col flex-wrap justify-between rounded">
			<div class="flex flex-row w-full flex-grow max-w-lg">
				<SearchInput on:search={handleSearch} />
			</div>
			<div class="flex flex-row justify-end items-right">
				<SortSelect on:sort={handleSort} />
			</div>
		</div>
	</div>
	<UrlList {urlList} {searchTerm} {sortOrder} />
</main>
