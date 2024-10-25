// @ts-nocheck
import type { PageServerLoad } from './$types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load = async ({ params, parent }: Parameters<PageServerLoad>[0]) => {
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
