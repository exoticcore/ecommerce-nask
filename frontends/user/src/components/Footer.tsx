'use client';
import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';
import Image from 'next/image';

import Visa from '../../public/visa.png';
import Master from '../../public/master.png';
import Paypal from '../../public/paypal.png';

export default function Footer() {
  return (
    <FooterWrapper>
      <div className="main">
        <div className="footer">
          <div className="footer__grid">
            <div className="footer__grid__logo">
              <h4>NASK</h4>
              <span>
                Specializes in providing high-quality, stylish products for your
                ware drobe
              </span>
            </div>
            <div className="footer__grid__link">
              <div>
                <h6>SHOP</h6>
                <ul>
                  <li>All Collections</li>
                  <li>Winter Edition</li>
                  <li>Discount</li>
                </ul>
              </div>
              <div>
                <h6>COMPANY</h6>
                <ul>
                  <li>About Us</li>
                  <li>Contract</li>
                  <li>Affiliates</li>
                </ul>
              </div>
              <div>
                <h6>SUPPORT</h6>
                <ul>
                  <li>FAQs</li>
                  <li>Cookie Policy</li>
                  <li>Terms of Use</li>
                </ul>
              </div>
            </div>
            <div className="footer__grid__payment">
              <h6>PAYMENT METHOD</h6>
              <div className="flex gap-4">
                <div className="payment-image">
                  <Image alt="" src={Visa} style={{ objectFit: 'contain' }} />
                </div>
                <div className="payment-image">
                  <Image alt="" src={Master} style={{ objectFit: 'contain' }} />
                </div>
                <div
                  className="payment-image"
                  style={{ width: '5rem', paddingTop: '0.6rem' }}
                >
                  <Image alt="" src={Paypal} style={{ objectFit: 'contain' }} />
                </div>
              </div>
            </div>
          </div>
          <hr
            style={{
              width: '100%',
              margin: '1.5rem 0',
              borderWidth: '0.085rem',
            }}
          />
          <span>Copyright&#9400; 2024 NASK. All right reserved</span>
        </div>
      </div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer.attrs({ className: 'select-none' })`
  width: 100%;
  background: ${variables.grey100};
  padding: 3rem 0;
  cursor: default;
  position: absolute;
  bottom: 0;

  .footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    span {
      color: ${variables.grey500};
      font-weight: 200;
      font-size: 0.95rem;
      line-height: 1.25rem;
    }

    &__grid {
      width: 100%;
      display: grid;
      grid-template-columns: 2fr 2fr 1fr;
      gap: 2rem;

      &__logo {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0 2.5rem;
      }

      &__link {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        div {
          width: 100%;
          ul {
            padding: 1rem 0;
          }

          li {
            padding: 0.5rem 0;
            font-weight: 200;
            color: ${variables.grey500};
            text-transform: none;
            font-size: 0.95rem;
            cursor: pointer;
          }
        }
      }

      &__payment {
        h6 {
          padding: 0 1rem;
          margin-bottom: 0.75rem;
        }
        .payment-image {
          position: relative;
          width: 2.5rem;
          height: 2.5rem;
        }
      }
    }
  }
`;
