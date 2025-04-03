'use client';

import { routing } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const isDefaultLocale = locale === routing.defaultLocale; // Precompute the language state on the server
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleLanguageOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true); // Set loading to true

    setTimeout(async () => {
      if (isDefaultLocale) {
        await router.push(`/vi`);
      } else {
        await router.push(`/${routing.defaultLocale}`);
      }
    });
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        checked={isDefaultLocale} // Use precomputed state
        onChange={handleLanguageOnChange}
        disabled={isLoading} // Disable input while loading
      />
      {isLoading ? (
        <div className="loading loading-spinner loading-md"></div>
      ) : (
        <>
          <div className="swap-on text-center border border-primary px-3 py-1 rounded-lg bg-primary text-primary-content shadow-md hover:shadow-lg transition-all">
            EN
          </div>
          <div className="swap-off text-center border border-secondary px-3 py-1 rounded-lg bg-secondary text-secondary-content shadow-md hover:shadow-lg transition-all">
            VI
          </div>
        </>
      )}
    </label>
  );
}
