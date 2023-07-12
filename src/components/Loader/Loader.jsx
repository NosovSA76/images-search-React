//import { RevolvingDot } from 'react-loader-spinner';
import React from 'react';
import DotLoader from 'react-spinners/DotLoader';
import { LoaderBackdrop, PendingDog } from './Loader.styled';
import Dog from 'assets/pending.png';

export const Loader = () => {
  return (
    <LoaderBackdrop>
      <DotLoader
        color="#f68000"
        size={150}
        cssOverride={{ position: 'absolute', top: '25%', left: '45%' }}
      />
      <PendingDog src={Dog} alt="Dog" />
    </LoaderBackdrop>
  );
};
