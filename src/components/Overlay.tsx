import React, { ReactElement, useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type OverlayPosition = 'left' | 'right' | 'center';

interface IOverlayProps {
  visible: boolean;
  children: ReactElement;
  onOverlayClick: React.MouseEventHandler;
  position: OverlayPosition;
}

const elModalRoot = document.getElementById('modal-root');

function getWrapperStyles(visible: boolean, position: OverlayPosition): string {
  const positionStyles =
    {
      right: 'justify-right',
      center: 'justify-center items-center',
      left: 'justify-left',
    }[position as string] || '';

  const visibilityStyles = visible ? 'visible' : 'invisible';

  return `${positionStyles} ${visibilityStyles}`;
}

function getContentStyles(visible: boolean, position: OverlayPosition): string {
  if (visible) return '';

  return (
    {
      right: 'translate-x-full',
      center: 'scale-0',
    }[position as string] || ''
  );
}

function getOverlayStyles(visible: boolean): string {
  return visible ? 'opacity-50' : 'opacity-0';
}

function getWrapperTransitionStyles(visible: boolean): string {
  return visible ? 'visibility 0s linear' : 'visibility 0s 150ms linear';
}

function getOverlayTransitionStyles(
  visible: boolean,
  position: OverlayPosition
) {
  return {
    wrapper: getWrapperStyles(visible, position),
    content: getContentStyles(visible, position),
    overlay: getOverlayStyles(visible),
    wrapperTransition: getWrapperTransitionStyles(visible),
  };
}

// @TODO: Close with escape
// @TODO: Trap focus.
// @TODO: Make transition duration configurable via props.
const Overlay = ({
  visible,
  children,
  onOverlayClick,
  position = 'center',
}: IOverlayProps): ReactElement => {
  const refOverlay = useRef(document.createElement('div'));
  const [visibleReady, setVisibleReady] = useState<boolean>(false);

  const appendModal = () => {
    elModalRoot?.appendChild(refOverlay.current);
  };

  const clearModal = () => {
    if (!elModalRoot?.contains(refOverlay.current)) return;
    setTimeout(() => elModalRoot.removeChild(refOverlay.current), 150);
  };

  useEffect(() => {
    visible ? appendModal() : clearModal();
    setTimeout(() => setVisibleReady(visible));
  }, [visible]);

  useEffect(() => {
    document.body.classList[visibleReady ? 'add' : 'remove']('overflow-hidden');
  }, [visibleReady]);

  const classes = getOverlayTransitionStyles(visibleReady, position);

  return ReactDOM.createPortal(
    <section
      className={`fixed inset-0 flex justify-end z-30 ${classes.wrapper}`}
      style={{ transition: classes.wrapperTransition }}
    >
      <div
        className={`transition-transform transform z-30 w-full h-full md:w-auto md:h-auto ${classes.content}`}
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
