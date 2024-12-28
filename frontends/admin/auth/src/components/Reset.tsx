import React from 'react';
import styled from 'styled-components';
import Background from '../commons/Background';
import FormCard from '../commons/FormCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Reset() {
  return (
    <Background>
      <FormCard>
        <div className="topic">reset password</div>
        <form method="post">
          <div className="input-icon">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <input type="submit" value="send email" className="button-long" />
        </form>
      </FormCard>
    </Background>
  );
}

export default Reset;
