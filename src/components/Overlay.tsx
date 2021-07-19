import React, { ReactElement, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface IOverlayProps {
  visible: boolean;
  children: ReactElement;
  onOverlayClick: React.MouseEventHandler;
}

const elModalRoot = document.getElementById('modal-root');

function getOverlayStyles(visible: boolean) {
  if (visible)
    return {
      wrapper: 'visible',
      content: '',
      overlay: 'opacity-50',
      wrapperTransition: 'visibility 0s linear',
    };

  return {
    wrapper: 'invisible',
    content: 'translate-x-full',
    overlay: 'opacity-0',
    wrapperTransition: 'visibility 0s 150ms linear',
  };
}

// @TODO: Support more positions.
// @TODO: Trap focus
const Overlay = ({
  visible,
  children,
  onOverlayClick,
}: IOverlayProps): ReactElement => {
  const refOverlay = useRef(document.createElement('div'));
  const refContent = useRef(null);

  useEffect(() => {
    if (elModalRoot?.innerHTML) elModalRoot.innerHTML = '';
    elModalRoot?.appendChild(refOverlay.current);

    return () => {
      elModalRoot?.removeChild(refOverlay.current);
    };
  }, []);

  useEffect(() => {
    const method = visible ? 'add' : 'remove';
    document.body.classList[method]('overflow-hidden');
  }, [visible]);

  const classes = getOverlayStyles(visible);

  return ReactDOM.createPortal(
    <section
      className={`fixed inset-0 flex justify-end z-30 ${classes.wrapper}`}
      style={{ transition: classes.wrapperTransition }}
    >
      <div
        className={`transition-transform transform z-30 ${classes.content}`}
        ref={refContent}
      >
        {children}
      </div>
      <div
        className={`transition-opacity absolute bg-black inset-0 z-20 ${classes.overlay}`}
        onClick={onOverlayClick}
      ></div>
    </section>,
    refOverlay.current
  );
};

export default Overlay;
