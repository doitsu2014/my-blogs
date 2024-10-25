import type { PageServerLoad } from './$types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load: PageServerLoad = async ({ params, parent }) => {
	const parentData = await parent();

	return {
		navigation: {
			blogs: {
				display: 'Blogs',
				url: '/blogs'
			}
		},
		parent: {
			...parentData
		}
	};
};
