import PropTypes from 'prop-types';
import { animateScroll } from 'react-scroll';
import React, { useState, useEffect } from 'react';
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import DefaultImg from 'assets/pbsh.png';
import { Loader } from '../Loader/Loader';
import ImageErrorView from 'components/ImageErrorView/ImageErrorView';
import { InitialStateGallery } from '../InitialStateGallery/InitialStateGallery';
import { Button } from 'components/Button/Button';
import imagesAPI from 'services/getImages';
import Modal from 'components/Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ImageGallery = ({ value }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState({ img: DefaultImg, tags: '' });

useEffect(() => {
    setPage(1);
    setImages([]);
  }, [value]);

useEffect(() => {
  const fetchData = async () => {
    if (page === 1) {
      setImages([]);
    }

    setStatus(Status.PENDING);
    if (error) {
      setError(null);
    }

    try {
      const imagesData = await imagesAPI.getImages(value, page);
      setImages((prevImages) =>
        page === 1 ? imagesData.hits : [...prevImages, ...imagesData.hits]
      );
      setTotalPages(Math.floor(imagesData.totalHits / 12));
      setStatus(Status.RESOLVED);
    } catch (error) {
      setError(error);
      setStatus(Status.REJECTED);
    }
  };

  if (value && page > 0) {
    fetchData();
  }
}, [value, page, error]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    animateScroll.scrollMore(600);
  };

  const handleModalClose = () => {
    setIsShowModal(false);
  };

const handleImageClick = (imageData) => {
  setModalData(imageData);
  setIsShowModal(true);
};

  if (status === 'idle') {
    return <InitialStateGallery text="We will find what you want!" />;
  }
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'rejected') {
    return <ImageErrorView message={error.message} />;
  }
  if (images.length === 0) {
    return (
      <ImageErrorView
        message={`Oops... there are no images matching your search... `}
      />
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <List>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              item={image}
              onImageClick={handleImageClick}
            />
          ))}
        </List>
        {images.length > 0 && status !== 'pending' && page <= totalPages && (
          <Button onClick={handleLoadMore}>Load More</Button>
        )}
        {isShowModal && (
          <Modal modalData={modalData} onModalClose={handleModalClose} />
        )}
      </>
    );
  }
};

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ImageGallery;
