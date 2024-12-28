import styled from 'styled-components';
import variables from '../../../scss/variables.module.scss';
import { useSwiper } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function SwiperTopButton() {
  const swiper = useSwiper();
  return (
    <SwiperTopButtonWrapper>
      <div className="prev-button" onClick={() => swiper.slidePrev()}>
        <FaChevronLeft />
      </div>
      <div className="next-button" onClick={() => swiper.slideNext()}>
        <FaChevronRight />
      </div>
    </SwiperTopButtonWrapper>
  );
}

const SwiperTopButtonWrapper = styled.div.attrs({ className: 'select-none' })`
  position: absolute;
  margin-top: 3rem;
  top: 0;
  right: 0;
  display: flex;
  border-radius: ${variables.borderRadius};
  background: ${variables.white};
  box-shadow: 0 0 0 1px ${variables.grey200};
  overflow: hidden;
  z-index: 2;

  div {
    cursor: pointer;
    padding: 0.75rem;
    color: ${variables.grey400};
    transition: ${variables.transition};
    box-shadow: 0 0 0 1px ${variables.grey200};

    &:hover {
      color: ${variables.black};
    }
  }
`;
