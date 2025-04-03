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
      <div className="flex-1 flex justify-center">
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
      <div className="flex-none">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
