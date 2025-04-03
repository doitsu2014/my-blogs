import { getBlogCategoryIds, getCategories } from '../server-actions/category.actions';
import Link from 'next/link';
import { getAllBlogPostsInFooter } from '../server-actions/post.actions';
import { getLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default async function Footer() {
  const t = await getTranslations('footer');
  const locale = await getLocale();
  const isDefaultLocale = locale === routing.defaultLocale;

  const categories = await getCategories();
  const categoryInformationToShow = isDefaultLocale
    ? categories.map((e) => ({
        displayName: e.displayName,
        slug: e.slug,
        id: e.id
      }))
    : categories
        .filter((category) =>
          category.categoryTranslations.some((translation) => translation.languageCode === locale)
        )
        .map((e) => {
          const matchedTranslation = e.categoryTranslations.find(
            (translation) => translation.languageCode === locale
          );
          return {
            displayName: matchedTranslation?.displayName,
            slug: matchedTranslation?.slug,
            id: e.id
          };
        });

  const allBlogs = await getAllBlogPostsInFooter();
  const blogInformationToShow = isDefaultLocale
    ? allBlogs.map((e) => ({
        title: e.title,
        slug: e.slug,
        id: e.id,
        categorySlug: e.category.slug
      }))
    : allBlogs
        .filter(
          (blog) =>
            blog.category?.categoryTranslations.some(
              (translation) => translation.languageCode === locale
            ) && blog.postTranslations?.some((translation) => translation.languageCode === locale)
        )
        .map((e) => {
          const matchedTranslation = e.postTranslations.find(
            (translation) => translation.languageCode === locale
          );
          const matchedCategoryTranslation = e.category.categoryTranslations.find(
            (translation) => translation.languageCode === locale
          );

          return {
            title: matchedTranslation?.title,
            slug: matchedTranslation?.slug,
            id: e.id,
            categorySlug: matchedCategoryTranslation?.slug
          };
        });

  const social_link_github = process.env.SOCIAL_LINK_GITHUB;
  const social_link_linkedin = process.env.SOCIAL_LINK_LINKEDIN;
  const social_link_x = process.env.SOCIAL_LINK_X;
  const social_link_facebook = process.env.SOCIAL_LINK_FACEBOOK;

  return (
    <footer className="footer p-8 bg-base-200 text-base-content w-full">
      <div className="flex justify-between w-full">
        <div className="flex-1">
          <span className="footer-title font-bold uppercase">{t('categories')}</span>
          <div className="flex flex-col">
            {categoryInformationToShow.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={`/${locale}/${category.slug}`}
                className="link link-hover">
                {category.displayName}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <span className="footer-title font-bold uppercase">{t('top5Articles')}</span>
          <div className="flex flex-col">
            {blogInformationToShow.slice(0, 5).map((blog) => (
              <Link
                key={blog.id}
                href={`/${locale}/${blog.categorySlug}`}
                className="link link-hover">
                {blog.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex-1 text-right">
          <span className="footer-title font-bold uppercase">{t('social')}</span>
          <div className="flex justify-end space-x-4 mt-2">
            {social_link_github && (
              <Link
                href={social_link_github}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#181717">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.333-5.466-5.93 0-1.31.467-2.382 1.236-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.803 5.624-5.475 5.92.43.37.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </Link>
            )}
            {social_link_linkedin && (
              <Link
                href={social_link_linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#000000">
                  <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.938v5.668H9.338V9h3.41v1.561h.048c.474-.9 1.635-1.85 3.367-1.85 3.6 0 4.268 2.368 4.268 5.448v6.293zM5.337 7.433a1.97 1.97 0 11-.001-3.94 1.97 1.97 0 01.001 3.94zM6.94 20.452H3.733V9h3.207v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </Link>
            )}
            {social_link_x && (
              <Link
                href={social_link_x}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#000000">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </Link>
            )}
            {social_link_facebook && (
              <Link
                href={social_link_facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#000000">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.006 4.388 10.984 10.125 11.854v-8.385H7.078v-3.47h3.047V9.413c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.953.926-1.953 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.057 24 18.08 24 12.073z" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="text-center w-full">
        <p>
          © {new Date().getFullYear()} <strong>ducth.dev</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
