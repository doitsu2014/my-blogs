import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	return {
		navigation: {
			blogs: {
				display: 'Blogs',
				url: '/blogs'
			}
		}
	};
};
