'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { CgTrack } from 'react-icons/cg';
import Image from 'next/image';
import ThLang from '../../../public/th.webp';
import EnLang from '../../../public/en.png';

export default function TopBar() {
  const t = useTranslations();
  const [lang, setLang] = useState<string>('');
  const [select, setSelect] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (locale: string) => {
    const regex = /^\/(th|en)(\/.*)?$/;
    const regexPath = pathname.replace(
      regex,
      (match, lang, path) => path || '/'
    );

    // router.push(`/${locale === t('locale') ? 'th' : locale}${regexPath}`);
    router.push(`/${locale}${regexPath}`);
  };

  return (
    <div className="topbar">
      <div className="main">
        <div className="topbar-main">
          <div
            className="topbar-main__change-language"
            // onClick={() => handleChange('en')}
          >
            <div className="flex" onClick={() => setSelect(!select)}>
              <p>{t('locale') === 'en' ? 'ไทย' : 'English'}</p>
              <MdArrowDropDown />
            </div>
            {select ? (
              <div className="change-language__options">
                <div
                  className={
                    t('locale') === 'th'
                      ? 'change-language__options__value'
                      : 'change-language__options__value disable'
                  }
                  onClick={() => handleChange('en')}
                >
                  <div className="lang-image">
                    <Image
                      src={EnLang}
                      alt="English"
                      fill
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <p>English</p>
                </div>
                <div
                  className={
                    t('locale') === 'en'
                      ? 'change-language__options__value'
                      : 'change-language__options__value disable'
                  }
                  onClick={() => handleChange('th')}
                >
                  <div className="lang-image">
                    <Image
                      src={ThLang}
                      alt="ภาษาไทย"
                      fill
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <p>ภาษาไทย</p>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="topbar-main__tracking">
            <CgTrack />
            <span>{t('Topbar.tracking')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
