import React, { JSXElementConstructor, ReactElement, useRef } from 'react';
import type { IModalContent } from 'src/types.js';
import Overlay from './Overlay.js';
import PhotosModal from './PhotosModal.js';
import RecipeModal from './RecipeModal.js';

interface IModalProps {
  type: string;
  onClose: () => void;
}

interface ModalByTypeConfig {
  [index: string]: {
    component: JSXElementConstructor<IModalContent>;
    position: 'left' | 'right' | 'center';
  };
}

const MODAL_BY_TYPE: ModalByTypeConfig = {
  photo: {
    component: PhotosModal,
    position: 'center',
  },
  recipe: {
    component: RecipeModal,
    position: 'right',
  },
};

const Modals = ({ type, onClose }: IModalProps): ReactElement => {
  // We need to store a reference to the last defined type so that the content doesn't disappear and the close
  // transition goes smoothly.
  const refLastType = useRef(type);
  if (type) refLastType.current = type;
  const { component: ModalContent, position } =
    MODAL_BY_TYPE[refLastType.current] || {};
  const isModalVisible = Boolean(type);

  return (
    <Overlay
      visible={isModalVisible}
      onOverlayClick={onClose}
      position={position}
    >
      {ModalContent && <ModalContent onClose={onClose} />}
    </Overlay>
  );
};

export default Modals;
