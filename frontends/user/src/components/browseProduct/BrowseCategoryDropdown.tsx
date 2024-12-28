'use client';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';

import { FaAngleRight } from 'react-icons/fa6';
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from 'react-icons/md';
import { useTranslations } from 'next-intl';
import { ISubcatAttr } from '../../interface/subcat-attr-interface';
import { useState } from 'react';

export default function CategoryDropdown({ data }: { data: ISubcatAttr[] }) {
  const [catActive, setCatActive] = useState(true);
  const t = useTranslations('shop');
  return (
    <CategoryDropdownWrapper>
      <div
        className={
          catActive ? 'category-list__main active' : 'category-list__main'
        }
      >
        <div
          className="category-list__main__title"
          onClick={() => setCatActive(!catActive)}
        >
          {t('sidebar.category')}
          <FaAngleRight className="category-list__main__title__icon" />
        </div>
        <div className="category-list__main__lists">
          {data.map((list, index) => {
            return (
              <div
                className="category-list__main__lists__container"
                key={index}
              >
                <div className="category-list__main__lists__container__name">
                  <MdOutlineCheckBoxOutlineBlank />
                  <p>{list.name}</p>
                </div>
                {list.product ? <span>{list.product}</span> : ''}
              </div>
            );
          })}
        </div>
      </div>
    </CategoryDropdownWrapper>
  );
}

const CategoryDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .category-list__main {
    display: flex;
    flex-direction: column;
    user-select: none;

    &.active {
      .category-list__main {
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
          .category-list__main__lists__container__name {
            text-decoration: underline;
          }
        }

        &__name {
          display: flex;
          gap: 0.5rem;
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

  /*          */
`;
