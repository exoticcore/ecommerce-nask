import { defineRouting, Pathnames } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['th', 'en'], // Define in this line the possible languages for translation
  defaultLocale: 'th', // Define in this line the default language to be shown
  localeDetection: false,
});

export const localePrefix = 'always';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
