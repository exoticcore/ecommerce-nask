import { useTranslations } from 'next-intl';
import { FaAngleRight } from 'react-icons/fa6';
import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';
import { IBrand } from '../../interface/brand.interface';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { useState } from 'react';

export default function BrandDropdown({ data }: { data: IBrand }) {
  const [canActive, setCanActive] = useState<boolean>(false);
  const t = useTranslations('shop');
  return (
    <BrandDropdownWrapper>
      <div
        className={canActive ? 'brand-list__main active' : 'brand-list__main'}
      >
        <div
          className="brand-list__main__title"
          onClick={() => setCanActive(!canActive)}
        >
          {t('sidebar.brand')}
          <FaAngleRight className="brand-list__main__title__icon" />
        </div>
        <div className="brand-list__main__lists">
          {data.brands.map((list, index) => {
            return (
              <div className="brand-list__main__lists__container" key={index}>
                <div className="brand-list__main__lists__container__name">
                  <MdOutlineCheckBoxOutlineBlank />
                  <p>{list.title}</p>
                </div>
                {list.product ? <span>{list.product}</span> : ''}
              </div>
            );
          })}
        </div>
      </div>
    </BrandDropdownWrapper>
  );
}

const BrandDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .brand-list__main {
    display: flex;
    flex-direction: column;
    user-select: none;

    &.active {
      .brand-list__main {
        &__title {
          background-color: ${variables.grey100};

          &__icon {
            rotate: calc(90deg);
          }
        }

        &__lists {
          height: 100%;
          max-height: 50rem;
        }
      }
    }

    &__title {
      display: flex;
      justify-content: space-between;
      border-radius: ${variables.borderRadius};
      cursor: pointer;
      padding: 1rem 0.5rem;
      transition: ${variables.transition};

      &__icon {
        transition: ${variables.transition};
      }

      &:hover {
        background-color: ${variables.grey100};
      }
    }

    &__lists {
      display: flex;
      flex-direction: column;
      padding: 0 0.35rem;
      max-height: 0;
      transition: ${variables.transitionNormal};
      overflow: hidden;

      &__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.65rem 0;
        font-weight: 200;
        cursor: default;

        &:hover {
          .brand-list__main__lists__container__name {
            text-decoration: underline;
          }
        }

        &__name {
          display: flex;
          gap: 0.5rem;
          transition: ${variables.transition};
        }

        span {
          font-size: 0.9rem;
          font-weight: 300;
          padding: 0.2rem 0.75rem;
          border-radius: ${variables.borderRadius};
          background-color: ${variables.grey100};
          box-shadow: ${variables.shadow1};
        }
      }
    }
  }
`;
