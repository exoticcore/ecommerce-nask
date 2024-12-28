'use client';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';
import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';

export default function CurratedPicks() {
  const t = useTranslations('Main');
  return (
    <CurratedPicksStyle>
      <h4>{t('currated')}</h4>
      <div className="currated__pick">
        <div className="pick-card">
          <Image
            alt=""
            src="https://images.unsplash.com/photo-1586278500132-7c85dfbc51d6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
          />
          <div className="pick-card__cover">
            <div className="pick-card__cover__button">
              best seller <FaArrowRightLong />
            </div>
          </div>
        </div>
        <div className="pick-card">
          <Image
            alt=""
            src="https://images.unsplash.com/photo-1668615522815-abb4378bb16d?q=80&w=1360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
          <div className="pick-card__cover">
            <div className="pick-card__cover__button">
              shop women <FaArrowRightLong />
            </div>
          </div>
        </div>
        <div className="pick-card">
          <Image
            alt=""
            src="https://images.unsplash.com/photo-1668454258342-d0e1cf140759?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
          <div className="pick-card__cover">
            <div className="pick-card__cover__button">
              shop men <FaArrowRightLong />
            </div>
          </div>
        </div>
        <div className="pick-card">
          <Image
            alt=""
            src="https://images.unsplash.com/photo-1668615522927-4f9afd59445e?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
          <div className="pick-card__cover">
            <div className="pick-card__cover__button">
              shop casual <FaArrowRightLong />
            </div>
          </div>
        </div>
      </div>
    </CurratedPicksStyle>
  );
}

const CurratedPicksStyle = styled.div.attrs({ className: 'select-none' })`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 4rem;
  width: 100%;
  .currated__pick {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;

    .pick-card {
      position: relative;
      width: 100%;
      height: 16rem;
      overflow: hidden;
      border-radius: ${variables.borderRadius};

      &__cover {
        z-index: 1;
        position: absolute;
        background: rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 100%;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        &__button {
          cursor: pointer;
          padding: 1rem;
          background: ${variables.white};
          border-radius: ${variables.borderRadius};
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-transform: capitalize;
          font-weight: 300;
        }
      }
    }
  }
`;
