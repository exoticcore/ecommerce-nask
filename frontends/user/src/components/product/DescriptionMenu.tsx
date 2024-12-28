import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function DescriptionMenu() {
  const [selectTopic, setSelectTopic] = useState<number>(0);
  const t = useTranslations('ProductPage');

  const topics = [t('details'), t('reviews'), t('discuss')];

  return (
    <DescriptionMenuWrapper>
      {topics.map((topic, index) => {
        return (
          <span
            className={index === selectTopic ? 'actived' : ''}
            key={index}
            onClick={() => setSelectTopic(index)}
          >
            {topic}
          </span>
        );
      })}
    </DescriptionMenuWrapper>
  );
}

const DescriptionMenuWrapper = styled.div.attrs({ className: 'select-none' })`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;

  span {
    width: 100%;
    text-align: center;
    color: ${variables.grey400};
    font-weight: 200;
    box-shadow: 0 1.25px 0 0 ${variables.grey400};
    padding: 1rem 0;
    text-transform: capitalize;
    transition: ${variables.transition};
    cursor: pointer;

    &:hover {
      color: ${variables.grey500};
      box-shadow: 0 1.25px 0 0 ${variables.grey500};
    }

    &.actived {
      color: ${variables.primary600};
      font-weight: 300;
      box-shadow: 0 1.25px 0 0 ${variables.primary600};
      cursor: default;
    }
  }
`;
