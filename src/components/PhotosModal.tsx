import React, { ReactElement } from 'react';
import Img from './Img.js';
import Overlay from './Overlay.js';

interface IPhotosModalProps {
  activePhoto: string;
  visible: boolean;
  onClose: () => void;
}

const PhotosModal = ({ activePhoto, visible, onClose }: IPhotosModalProps): ReactElement => {
  return (
    <Overlay visible={visible} onOverlayClick={onClose} position="center">
      <section className="w-full h-full flex flex-col bg-white md:p-5 md:rounded-2xl shadow-2xl max-w-3xl">
        <button className="self-end mb-2.5 pt-5 pr-5 md:p-0" onClick={onClose}>
          ❎
        </button>
        <div className="flex flex-col h-full justify-center items-center">
          {activePhoto ? (
            <Img
              src={activePhoto}
              key={activePhoto}
              className="w-full md:h-full"
              // @TODO Replace with SVG spinner
              placeholder={<p>Cargando</p>}
            />
          ) : (
            <p>No se ha subido ninguna foto aún.</p>
          )}
          <div className="mt-2.5 overflow-hidden">
            <button>⬆</button>
            {activePhoto && <button>❌</button>}
          </div>
        </div>
      </section>
    </Overlay>
  );
};

export default PhotosModal;
