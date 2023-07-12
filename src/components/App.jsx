import React, { useState } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from './GlobalStyle';
import {Searchbar} from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout/Layout';

const App = () => {
  const [textSearch, setTextSearch] = useState('');

  const handleSubmit = (text) => {
    setTextSearch(text);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <Layout>
        <ImageGallery value={textSearch} />
      </Layout>
      <ToastContainer transition={Slide} draggablePercent={60} />
      <GlobalStyle />
    </>
  );
};

export default App;
