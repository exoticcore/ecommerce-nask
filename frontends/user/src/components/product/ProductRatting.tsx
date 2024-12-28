import styled from 'styled-components';
import variables from '../../../scss/variables.module.scss';

import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

export default async function ProductRatting({ ratting }: { ratting: number }) {
  let stars = [];
  const newRatting = Math.round((ratting + Number.EPSILON) * 100) / 100;
  const fullstar = Math.floor(newRatting);
  const isHalf = ratting - fullstar < 1 && ratting - fullstar > 0;

  for (let i = 0; i <= 4; i++) {
    if (i < fullstar) {
      stars.push(<FaStar key={i} />);
    } else if (isHalf && fullstar === i) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return (
    <div className="product-main-rating">
      <div className="rating-star">{stars}</div>
      <span>({newRatting})</span>
    </div>
  );
}

// const ProductRattingWrapper = styled.div.attrs({ className: 'select-none' })`
//   display: flex;
//   gap: 0.3rem;
//   align-items: center;

//   .rating-star {
//     display: flex;
//     gap: 0.2rem;
//     color: #ffbf00;
//   }

//   span {
//     font-weight: 300;
//   }
// `;
