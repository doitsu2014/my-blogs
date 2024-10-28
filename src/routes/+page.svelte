<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<Navbar>
	<NavBrand href="/">
		<img src="/doitsu-technology-logo.png" class="me-3 h-6 sm:h-9" alt="Doitsu Technology Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/docs/components/navbar">Navbar</NavLi>
		<NavLi href="/pricing">Pricing</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl>
</Navbar>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<p>{data?.navigation.blogs.display}</p>
