'use server';

import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa6';

export default async function Navigation({
  navigate,
  primary,
}: {
  navigate: { title: string; link?: string; none?: boolean }[];
  primary?: number;
}) {
  const locale = await getLocale();
  const naviLen = navigate?.length;
  return (
    <div className="product-navigation">
      {!primary
        ? navigate?.map((navi, index) => {
            const url = `/${locale}/${navi?.link || 'shop'}`;
            return (
              <div className="flex items-center gap-4" key={index}>
                {index < naviLen - 1 ? (
                  <>
                    <Link href={url}>
                      <span>{navi.title}</span>
                    </Link>
                    <span>
                      <FaAngleRight />
                    </span>
                  </>
                ) : (
                  <p>{navi.title}</p>
                )}
              </div>
            );
          })
        : navigate?.map((navi, index) => {
            const url = `/${locale}/${navi?.link || 'shop'}`;
            return (
              <div className="flex items-center gap-4" key={index}>
                {index !== primary ? (
                  <>
                    {!navi.none ? (<Link href={url}>
                      <span>{navi.title}</span>
                    </Link>) :  <span>{navi.title}</span>}
                    {navigate.length - 1 !== index ? (
                      <span>
                        <FaAngleRight />
                      </span>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  <>
                    <p>{navi.title}</p>
                    {navigate.length - 1 !== index ? (
                      <span>
                        <FaAngleRight />
                      </span>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </div>
            );
          })}
    </div>
  );
}

// const NivagationWrapper = styled.div.attrs({ className: 'select-none' })`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   font-weight: 300;
//   font-size: 0.95rem;
//   width: 100%;
//   margin-top: 2.5rem;

//   span {
//     color: ${variables.grey400};
//     font-weight: 200;
//     cursor: pointer;
//     transition: ${variables.transition};

//     &:hover {
//       color: ${variables.primary500};
//       text-decoration: underline;
//     }
//   }

//   p {
//     cursor: default;
//   }
// `;
