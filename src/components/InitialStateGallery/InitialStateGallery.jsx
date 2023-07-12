import React from 'react';
import PropTypes from 'prop-types';
import { Hero, Text, Wrapper } from './InitialStateGallery.styled';
import minions from 'assets/peabody.png';


export const InitialStateGallery = ({ text }) => {
  return (
    <Wrapper>
      <Text>{text}</Text>
      <Hero src={minions} alt="Minions" />
    </Wrapper>
  );
};

InitialStateGallery.propTypes = {
  text: PropTypes.string.isRequired,
};
