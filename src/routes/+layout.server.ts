import type { LayoutServerLoad } from './$types';

export const ssr = true;

export const load: LayoutServerLoad = async () => {
	return {
		categories: ['Home']
	};
};
