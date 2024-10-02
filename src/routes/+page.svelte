<script lang="ts">
	import type { PageData, PageServerData } from './$types';

	export let pageServerData: PageServerData;
	export let pageData: PageData;
	console.log(pageServerData);
	console.log(pageData);
	$: ({ categories } = pageData);
	console.log(categories);
</script>

<div class="flex justify-center">
	<div class="w-[40vw]">
		<img src="/doitsu-technology-logo.svg" alt="Logo" class="w-full" />
	</div>
</div>

<div class="typography flex justify-center">
	<h1>Welcome to My Blog</h1>
</div>
