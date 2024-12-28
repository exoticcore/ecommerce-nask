import styled from 'styled-components';
import variables from '../../scss/variables.module.scss';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaCartPlus } from 'react-icons/fa';

export default function Feature() {
  const price = 72;
  const discount = 0.1;

  const price2 = 48;
  const discount2 = 0.15;

  return (
    <FeatureStyle>
      <div className="feature-head">
        <h4>feature products</h4>
        <div className="market__button">
          <div className="prev-button">
            <FaChevronLeft />
          </div>
          <div className="next-button">
            <FaChevronRight />
          </div>
        </div>
      </div>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-card__image">
            <Image
              src="https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt=""
              style={{ objectFit: 'cover', objectPosition: 'center right' }}
            />
          </div>
          <div className="feature-card__details">
            <div className="flex flex-col gap-2">
              <div className="feature-card__details__title">Black Cap</div>
              {discount2 ? (
                <div className="feature-card__details__price">
                  <p>${Math.ceil(price2 - price2 * discount2)}</p>
                  <span>${price2}</span>
                </div>
              ) : (
                price
              )}
            </div>
            <div className="feature-card__details__cart">
              <FaCartPlus />
            </div>
          </div>
          <div className="sale active">sale</div>
        </div>
        <div className="feature-card">
          <div className="feature-card__image">
            <Image
              src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt=""
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="feature-card__details">
            <div className="flex flex-col gap-2">
              <div className="feature-card__details__title">Skull T-Shirt</div>
              {false ? (
                <div className="feature-card__details__price">
                  <p>${Math.ceil(price - price * discount)}</p>
                  <span>${price}</span>
                </div>
              ) : (
                <div className="feature-card__details__price">
                  <p>$35</p>
                </div>
              )}
            </div>
            <div className="feature-card__details__cart">
              <FaCartPlus />
            </div>
          </div>
          <div className="sale">sale</div>
        </div>
        <div className="feature-card">
          <div className="feature-card__image">
            <Image
              src="https://images.unsplash.com/photo-1547547908-dddfb9113547?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt=""
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="feature-card__details">
            <div className="flex flex-col gap-2">
              <div className="feature-card__details__title">Autumn Dress</div>
              {discount ? (
                <div className="feature-card__details__price">
                  <p>${Math.ceil(price - price * discount)}</p>
                  <span>${price}</span>
                </div>
              ) : (
                price
              )}
            </div>
            <div className="feature-card__details__cart">
              <FaCartPlus />
            </div>
          </div>
          <div className="sale active">sale</div>
        </div>
      </div>
    </FeatureStyle>
  );
}

const FeatureStyle = styled.div.attrs({ className: 'select-none' })`
  display: flex;
  cursor: default;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  margin: 4rem 0;

  .feature-head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .market__button {
      display: flex;
      right: 2rem;
      overflow: hidden;
      box-shadow: 0 0 0 1px ${variables.grey200};
      top: 2rem;
      border-radius: ${variables.borderRadius};
      background: ${variables.white};
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
    }
  }

  .feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3rem;

    .feature-card {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      border-radius: ${variables.borderRadius};
      overflow: hidden;

      &__image {
        position: relative;
        border-radius: ${variables.borderRadius};
        overflow: hidden;
        width: 100%;
        height: 23rem;
        z-index: 1;
        background: rgba(0, 0, 0, 0.4);
      }

      &__details {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__title {
          font-size: 1rem;
          font-weight: 300;
          padding: 0.2rem 0;
        }

        &__price {
          display: flex;
          gap: 0.5rem;

          p {
            font-size: 1.3rem;
          }

          span {
            font-size: 0.85rem;
            color: ${variables.grey400};
            text-decoration: line-through;
            font-weight: 300;
          }
        }

        &__cart {
          padding: 0.75rem;
          border-radius: ${variables.borderRadius};
          background: rgb(31, 36, 45);
          color: ${variables.white};
          font-size: 1rem;
          cursor: pointer;
          transition: ${variables.transition};
          margin-right: 0.1rem;

          &:hover {
            background: transparent;
            box-shadow: 0 0 0 1px #03020f;
            color: #03020f;
          }
        }
      }

      .sale {
        display: none;
        position: absolute;
        z-index: 2;
        padding: 0.5rem 1rem;
        color: ${variables.white};
        background: #ab0003;
        border-radius: ${variables.borderRadius};
        margin: 1rem;
        text-transform: uppercase;
        font-size: 0.9rem;
        letter-spacing: ${variables.letterSpacing};
        box-shadow: ${variables.shadow1};

        &.active {
          display: block;
        }
      }
    }
  }
`;
