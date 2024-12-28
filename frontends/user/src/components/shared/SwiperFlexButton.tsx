import styled from 'styled-components';
import variables from '../../../scss/variables.module.scss';
import { useSwiper } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function SwiperFlexButton() {
  const swiper = useSwiper();
  return (
    <SwiperFlexButtonWrapper>
      <div className="prev-button" onClick={() => swiper.slidePrev()}>
        <FaChevronLeft />
      </div>
      <div className="next-button" onClick={() => swiper.slideNext()}>
        <FaChevronRight />
      </div>
    </SwiperFlexButtonWrapper>
  );
}

const SwiperFlexButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.75rem;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;

  div {
    padding: 1rem 1rem;
    border-radius: ${variables.borderRadius};
    background: rgba(255, 255, 255, 0.5);
    color: ${variables.grey400};

    &:hover {
      color: ${variables.primary600};
    }
  }
`;
