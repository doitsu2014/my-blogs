<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		DropdownDivider
	} from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import type { LayoutData } from './$types';
	$: activeUrl = $page.url.pathname;

	export let layoutData: LayoutData;
	console.log(layoutData);
</script>

<Navbar>
	<NavBrand href="/">
		<img src="/doitsu-technology-logo.png" class="me-3 h-6 sm:h-9" alt="Doitsu Technology Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Doitsu Technology</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/docs/components/navbar">Navbar</NavLi>
		<NavLi href="/docs/components/accordion">Accordion</NavLi>
		<NavLi href="/docs/components/alert">Alert</NavLi>
		<NavLi href="/docs/components/avatar">Avatar</NavLi>
		<NavLi class="cursor-pointer" id="test-dropdown">
			Dropdown<ChevronDownOutline class="ms-2 inline h-6 w-6 text-primary-800 dark:text-white" />
		</NavLi>
		<Dropdown class="z-20 w-44" placement="bottom" triggeredBy="#test-dropdown">
			<DropdownItem href="/">Dashboard</DropdownItem>
			<DropdownItem href="/docs/components/navbar">Settings</DropdownItem>
			<DropdownItem href="/">Earnings</DropdownItem>
			<DropdownDivider />
			<DropdownItem href="/">Sign out</DropdownItem>
		</Dropdown>
	</NavUl>
	<DarkMode />
</Navbar>

<!-- {#each layoutData?.categories ?? [] as category} -->
<!-- 	<li> -->
<!-- 		{category} -->
<!-- 	</li> -->
<!-- {/each} -->
<!---->
<!-- {layoutData?.categories?.length ?? 0} -->

<svelte:head>
	<title>Doitsu Technology</title>
	<meta name="description" content="This is my blog (Doitsu Technology)" />
</svelte:head>

<slot></slot>
