import React from 'react';

interface IAvocadoProps {
  className: string;
  width?: string;
  height?: string;
}

const Avocado = ({
  className,
  width = '228.066',
  height = '312.99',
}: IAvocadoProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 228.066 312.99"
    className={className}
  >
    <g id="palta" transform="translate(-1597.162 -561.924)">
      <path
        id="Trazado_12"
        data-name="Trazado 12"
        d="M1668.406,864.228s-56.456-12.259-68.363-76.473S1652.3,669.718,1652.3,669.718s19.8-10.722,46.008-58.706,22.263-54.721,22.263-54.721,39.984-3.661,45.744,29.469,22.538,68.466,22.538,68.466,22.964,47.2,12.758,119.5-41.1,89.925-77.088,93.99S1668.406,864.228,1668.406,864.228Z"
        transform="translate(21 6)"
        fill="#56c596"
      />
      <path
        id="Trazado_9"
        data-name="Trazado 9"
        d="M1668.406,864.228s-56.456-12.259-68.363-76.473c-7.061-38.079,7.272-60.416,17.992-76.806a185.47,185.47,0,0,1,18.582-23.227c7.831-8.674,35.484-28.725,61.693-76.71s36.281-47.217,36.281-47.217,25.966-11.165,31.726,21.964,22.538,68.466,22.538,68.466,22.964,47.2,12.758,119.5-41.1,89.925-77.088,93.99S1668.406,864.228,1668.406,864.228Z"
        transform="translate(-1 -0.061)"
        fill="#7be495"
      />
      <path
        id="Trazado_8"
        data-name="Trazado 8"
        d="M1766.931,862.447c-25.925-8.21-43.8-19.5-53.743-59.257s18.08-74.287,18.08-74.287,14.058-21.577,55.971-63.49c19.028-19.028,24.028-38.264,29.382-50.123,6.284-13.917,10.8-18.58,10.8-18.58s13.827-16.419,19.012,0,6.481,46.234,19.444,77.344,23.765,69.134,7.778,128.331S1792.856,870.657,1766.931,862.447Z"
        transform="translate(-97.901 -11.837)"
        fill="#cff4d2"
      />
      <ellipse
        id="Elipse_2"
        data-name="Elipse 2"
        cx="50.5"
        cy="69"
        rx="50.5"
        ry="69"
        transform="matrix(0.914, 0.407, -0.407, 0.914, 1681.446, 667.966)"
        fill="#86382e"
      />
      <ellipse
        id="Elipse_3"
        data-name="Elipse 3"
        cx="33.5"
        cy="49"
        rx="33.5"
        ry="49"
        transform="translate(1690.96 682.604) rotate(33)"
        fill="#a54f3e"
      />
    </g>
  </svg>
);

export default React.memo(Avocado);
