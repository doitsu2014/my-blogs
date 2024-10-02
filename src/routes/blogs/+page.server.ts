import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		posts: ['Post 01']
	};
};
