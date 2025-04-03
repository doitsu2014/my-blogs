import Link from 'next/link';
import NavbarItem from './navbar-item';
import Image from 'next/image';
import { getCategories } from '../server-actions/category.actions';
import { routing } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import LanguageSwitcher from '../../components/language-switcher';

export default async function Navbar() {
  const locale = await getLocale(); // Get the current locale
  const defaultLocale = routing.defaultLocale; // Assuming 'defaultLocale' is defined in your translations
  const isDefaultLocale = locale === defaultLocale; // Precompute the language state on the server

  const categories = await getCategories();
  const links = isDefaultLocale
    ? categories.map((category) => ({
        id: category.id,
        displayName: category.displayName,
        slug: category.slug
      }))
    : categories.map((category) => {
        const matchedTranslation = category.categoryTranslations.find(
          (translation) => translation.languageCode === locale
        );
        return {
          id: category.id,
          displayName: matchedTranslation ? matchedTranslation.displayName : category.displayName,
          slug: matchedTranslation ? matchedTranslation.slug : category.slug
        };
      });

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <Link className="btn btn-ghost text-xl" href={`/${locale}/`}>
          <div className="w-10 rounded-full">
            <Image
              src="/images/doitsu-technology-logo.png"
              width={45}
              height={45}
              className="mr-3"
              alt="D Tech"
            />
          </div>
          Duc Tran
        </Link>
      </div>
      {/* Mobile Menu Toggle */}
      <div className="flex-1 lg:hidden">
        <details className="dropdown">
          <summary className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
              />
            </svg>
          </summary>
          <ul className="dropdown-content menu mt-3 p-4 shadow-lg bg-primary text-primary-content rounded-lg border border-primary-focus min-w-40">
            {links.map((link) => (
              <li key={link.id}>
                <NavbarItem
                  slug={`/${locale}/${link.slug}`}
                  displayName={link.displayName}
                  key={link.id}></NavbarItem>
              </li>
            ))}
          </ul>
        </details>
      </div>
      {/* Categories for larger screens */}
      <div className="hidden lg:flex flex-1 justify-end px-2">
        <ul className="menu menu-horizontal px-1 space-x-1">
          {links.map((link) => (
            <li key={link.id}>
              <NavbarItem
                slug={`/${locale}/${link.slug}`}
                displayName={link.displayName}
                key={link.id}></NavbarItem>
            </li>
          ))}
        </ul>
      </div>
      {/* Language Switcher */}
      <div className="flex-none">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
