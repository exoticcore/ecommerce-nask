'use client';
import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';
import DescriptionMenu from './DescriptionMenu';

import { FaPlus, FaMinus } from 'react-icons/fa';
import { useState } from 'react';
import IProduct from '../../interface/product.interface';

export default function ProductDescription({ data }: { data: IProduct }) {
  const detail = regex(data.translate[0].information || '');
  return (
    <ProductDescriptionWrapper>
      <DescriptionMenu />
      {detail.map((description, index) => {
        return <Description key={index} details={description} />;
      })}
    </ProductDescriptionWrapper>
  );
}

const ProductDescriptionWrapper = styled.div``;

type DetailType = {
  topic: string;
  description: string;
};

function regex(data: string) {
  const regex =
    /<section>\s*<h5>(.*?)<\/h5>\s*<div>([\s\S]*?)<\/div>\s*<\/section>/g;

  const results = [];

  let match;
  while ((match = regex.exec(data)) !== null) {
    const topic = match[1];
    const description = match[2];

    const obj = {
      topic: topic,
      description: description.trim(), // Trim to remove extra whitespace
    };
    results.push(obj);
  }

  return results;
}

function Description({ details }: { details: DetailType }) {
  const [hide, setHide] = useState<boolean>(false);
  return (
    <DetailsDescriptionWrapper>
      <div className="detail-topic select-none" onClick={() => setHide(!hide)}>
        <h6>{details.topic}</h6>
        {hide ? <FaPlus /> : <FaMinus />}
      </div>
      <div
        className={hide ? 'detail-description' : 'detail-description active'}
      >
        <div
          className="detail-description__content"
          dangerouslySetInnerHTML={{ __html: details.description }}
        ></div>
      </div>
    </DetailsDescriptionWrapper>
  );
}

const DetailsDescriptionWrapper = styled.div`
  .detail-topic {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1.5rem 1rem;
    background: ${variables.grey100};
    margin-top: 0.5rem;
    cursor: pointer;
  }
  .detail-description {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease-out;
    /* transition: ${variables.transitionNormal}; */

    &__content {
      padding: 1rem;
      font-weight: 200;
      line-height: 1.5rem;
    }

    &.active {
      max-height: 100rem;
      transition: max-height 0.25s ease-in;
      /* transition: ${variables.transitionNormal}; */
    }

    p {
      text-indent: 1.5rem;
      font-weight: 200;
      line-height: 1.5rem;
      cursor: text;
    }

    ul {
      list-style-type: circle;
      padding: 0 2.5rem;

      li {
        font-weight: 200;
        line-height: 1.5rem;
        cursor: text;
      }
    }
  }
`;
