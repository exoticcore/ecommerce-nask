'use client';

import styled from 'styled-components';
import variables from '@/scss/variables.module.scss';
import Link from 'next/link';

import { MdOutlineEmail } from 'react-icons/md';

export default function Subscribe() {
  return (
    <SubscribeStyle>
      <h4>
        Subscribe to our newsletter to get updates to our latest collections
      </h4>
      <p>
        Get 20% off on your first order just by subscribing to our newsletter
      </p>
      <div className="subscribe__form">
        <input type="text" placeholder="Enter your email" />
        <button>Subscribe</button>
        <div className="form-icon">
          <MdOutlineEmail className="form-icon__icon" />
        </div>
      </div>
      <div className="subscribe__policy">
        <span>You will be able to unsubscribe at any time.</span>
        <span>
          Read our Privacy Policy <Link href="#">here</Link>
        </span>
      </div>
    </SubscribeStyle>
  );
}

const SubscribeStyle = styled.div.attrs({ className: 'select-none' })`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem 0;
  gap: 1.25rem;
  cursor: default;

  h4 {
    max-width: 35rem;
    text-transform: none;
    text-align: center;
  }

  p {
    font-size: 1rem;
    font-weight: 200;
  }

  .subscribe {
    &__form {
      display: flex;
      position: relative;
      gap: 0.25rem;

      .form-icon {
        display: flex;
        position: absolute;
        height: 100%;
        left: 0;
        align-items: center;
        padding: 0 1rem;
        font-size: 1.35rem;
        color: ${variables.grey400};
      }

      input {
        padding: 0.75rem;
        padding-left: 3rem;
        box-shadow: 0 0 0 1px ${variables.grey300};
        background: ${variables.grey100};
        border-radius: ${variables.borderRadius};

        &::placeholder {
          font-weight: 200;
          letter-spacing: 0;
          font-size: 0.9rem;
        }
      }
      button {
        padding: 1rem;
        border-radius: ${variables.borderRadius};
        background: rgb(31, 36, 45);
        color: ${variables.white};
        font-weight: 300;
        font-size: 0.9rem;
        transition: ${variables.transition};

        &:hover {
          background: rgb(59, 66, 86);
        }
      }
    }

    &__policy {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 0.9rem;
      font-weight: 300;
      color: ${variables.grey400};

      a {
        color: rgb(31, 36, 45);
        text-decoration: underline;
      }
    }
  }
`;
