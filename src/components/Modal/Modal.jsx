import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ModalBackdrop,
  ModalContent,
  ModalDescr,
  ModalPicture,
} from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
modalRoot.style.position = "fixed";
modalRoot.style.zIndex = 5;



const Modal = ({ modalData, onModalClose }) => {
  const { largeImageURL, tags } = modalData;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  return createPortal(
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>
        <ModalPicture src={largeImageURL} alt={tags} />
        <ModalDescr>{tags}</ModalDescr>
      </ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  modalData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onModalClose: PropTypes.func,
};

export default Modal;
