import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faAngleDown,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import * as Theme from '../constant/styles';
import { useAppSelector } from '../utils/redux';

function Header(): React.ReactNode {
  const user = useAppSelector((state) => state.user);
  return (
    <HeaderStyle>
      <div className="leftside">
        <div className="topic"></div>
        <FontAwesomeIcon icon={faBars} className="icon-button" />
      </div>
      <div className="rightside">
        <div className="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search__icon" />
          <input type="text" name="search" placeholder="Search..." />
        </div>
        <div className="noti">
          <FontAwesomeIcon icon={faBell} className="icon-button" />
          <div className="alert--active"></div>
        </div>
        <div className="user">
          <div className="profile-image">
            <p>{user.user.name[0]}</p>
          </div>
          <div className="info">
            <div className="info__name">
              <p>{user.user.name}</p>
              <FontAwesomeIcon
                icon={faAngleDown}
                className="info__name-angle"
              />
            </div>
            <span className="info__position">{user.user.roles[0]}</span>
          </div>
        </div>
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div.attrs({ className: 'select-none' })`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.75rem;
  user-select: none;
  background: ${Theme.white};
  position: sticky;
  top: 0;
  z-index: 2;
  width: 100%;
  cursor: default;

  .icon-button {
    font-size: 1.35rem;
    cursor: pointer;
  }

  .topic {
    display: none;
  }

  .leftside {
    display: flex;
    align-items: center;
  }

  .rightside {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0.85rem;

    .search {
      position: relative;
      display: none;
      align-items: center;
      &__icon {
        color: ${Theme.grey400};
        position: absolute;
        margin-left: 0.65rem;
        font-size: 0.75rem;
      }
      input {
        padding: 0.2rem 0;
        padding-left: 2rem;
        background: ${Theme.backgroundColor};
        box-shadow: 0 0 0 1px ${Theme.grey300};
        border-radius: 5rem;
        font-size: 0.9rem;
        &::placeholder {
          font-size: 0.85rem;
        }
        &:focus {
          box-shadow: 0 0 0 2px ${Theme.grey300};
        }
      }
    }

    .noti {
      position: relative;
      padding: 0.15rem;
      .alert {
        display: none;
        &--active {
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          border-radius: 50%;
          background: ${Theme.redDark};
          width: 0.65rem;
          height: 0.65rem;
          border: 0.3px solid ${Theme.backgroundColor};
        }
      }
    }

    .user {
      display: none;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border-radius: ${Theme.borderRadius};
      cursor: pointer;

      .profile-image {
        user-select: none;
        background: ${Theme.grey500};
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        color: ${Theme.white};
      }

      .info {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 0.2rem;
        &__name {
          display: flex;
          gap: 0.2rem;
          align-items: center;
          font-size: 1.025rem;
          text-transform: capitalize;
          &-angle {
            padding-top: 0.275rem;
            font-size: 0.65rem;
          }
        }
        &__position {
          color: ${Theme.grey500};
          font-weight: 300;
          font-size: 0.75rem;
          text-transform: capitalize;
        }
      }
    }
  }

  @media screen and (min-width: ${Theme.tabletHorizontal}) {
    padding: 1rem 2rem;
    .leftside {
      .topic {
        display: block;
      }
      .icon-button {
        display: none;
      }
    }
    .rightside {
      .search {
        display: flex;
      }
      gap: 1.5rem;
      .user {
        display: flex;
      }
    }
  }
`;

export default Header;
