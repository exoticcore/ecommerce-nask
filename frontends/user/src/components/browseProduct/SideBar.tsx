'use client';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';

import { MdChevronRight } from 'react-icons/md';
import { useState } from 'react';
import CategoryDropdown from './BrowseCategoryDropdown';
import BrandDropdown from './BrandDropdown';
import IProduct from '../../interface/product.interface';
import { ISubcatAttr } from '../../interface/subcat-attr-interface';
import { IBrand } from '../../interface/brand.interface';

export default function Sidebar({
  subcatAttrs,
  brands,
}: {
  subcatAttrs: ISubcatAttr[];
  brands: IBrand;
}) {
  return (
    <SidebarWrapper>
      <div className="sidebar-main">
        <CategoryDropdown data={subcatAttrs} />
        <hr />
        <BrandDropdown data={brands} />
      </div>
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.div.attrs({ className: 'select-none' })`
  display: flex;
  flex-direction: column;
  font-weight: 300;

  .sidebar {
    &-main {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      border-radius: ${variables.borderRadius};
      font-weight: 300;
      text-transform: capitalize;
      border: 1px solid ${variables.grey200};

      hr {
        margin: 0.35rem;
      }

      &__menu {
        padding: 1rem;
        border-radius: ${variables.borderRadius};
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        &:hover {
          background: ${variables.grey100};
        }

        &.active {
          background: ${variables.grey100};

          .menu-icon {
            transform: rotate(90deg);
          }
        }
      }
    }
  }
`;
