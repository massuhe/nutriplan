import React, { useEffect, useRef, useState } from 'react';

interface IImgProps {
  src: string;
  className?: string;
  placeholder?: JSX.Element;
  onLoad?: () => void;
}

const Img = ({
  src,
  className = '',
  placeholder = <></>,
  onLoad,
}: IImgProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const refShouldTransition = useRef<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      if (!loading) return;
      refShouldTransition.current = true;
    }, 250);
  }, []);

  const imgClasses = loading ? 'max-h-0 max-w-0' : 'max-h-screen max-w-3xl';
  const imgTransition = refShouldTransition.current && {
    transition: 'max-height 0.5s 0.4s ease-in-out, max-width 0.5s ease-in-out',
  };

  const onImageLoad = () => {
    setLoading(false);
    if (!onLoad) return;
    onLoad();
  };

  return (
    <>
      {loading && placeholder}
      <img
        style={imgTransition || {}}
        className={`${className} ${imgClasses}`}
        src={src}
        onLoad={onImageLoad}
      ></img>
    </>
  );
};

export default Img;
