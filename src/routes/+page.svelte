<script lang="ts">
	import type { LayoutServerData, PageServerData } from './$types';
	export let data: PageServerData;
	export let layoutData: LayoutServerData;
	console.log(data, layoutData);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<p>{data?.navigation.blogs.display}</p>
