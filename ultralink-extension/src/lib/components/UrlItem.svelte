<script>
	import { createEventDispatcher } from "svelte";
	export let item;
	const dispatch = createEventDispatcher();
	function copyToClipboard() {
		navigator.clipboard
			.writeText(item.url)
			.then(() => dispatch("notification", "URL copied to clipboard!"))
			.catch((err) => console.error("Failed to copy: ", err));
	}
	function deleteUrl() {
		dispatch("delete");
	}
</script>

<li class="flex items-center justify-between px-1 py-1 rounded bg-gray-700/20 group url-item">
	<a href={item.url} target="blank" class="flex items-center overflow-hidden flex-grow mr-2">
		<div class="flex items-center overflow-hidden flex-grow mr-2">
			<img src={item.favicon} alt="Favicon" class="w-8 h-8 mr-3 rounded flex-shrink-0" />
			<div class="overflow-hidden">
				<div class="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</div>
				<div class="text-xs text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">{item.url}</div>
			</div>
		</div>
		<div class="flex-shrink-0 group-hover:flex hidden relative text-xl right-0">
			<button class="text-gray-200 hover:text-blue-500 mr-2 p-1 rounded" on:click={copyToClipboard} title="Copy URL">
				<span class="mdi mdi-content-copy"></span>
			</button>
			<button class="text-gray-200 hover:text-red-700 p-1 rounded" on:click={deleteUrl} title="Delete">
				<span class="mdi mdi-delete"></span>
			</button>
		</div>
	</a>
</li>
