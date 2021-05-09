import { useEffect } from 'react';
import { BREAKPOINTS } from '../lib/constants.js';

const useResponsiveCall = <T extends unknown>(
  argumentsByBreakPoint: T[],
  fnToCall: (arg: T) => void
): void => {
  useEffect(() => {
    const makeMedia = (type: string, width: number) =>
      `(${type}-width: ${width}px)`;

    const MEDIA_ITEMS: { [index: string]: T } = [
      makeMedia('max', BREAKPOINTS.sm),
      makeMedia('min', BREAKPOINTS.sm + 1),
      makeMedia('min', BREAKPOINTS.lg),
      makeMedia('min', BREAKPOINTS.xl),
      makeMedia('min', BREAKPOINTS['2xl']),
    ].reduce(
      (acc, media, i) => ({ ...acc, [media]: argumentsByBreakPoint[i] }),
      {}
    );

    const mqls = Object.keys(MEDIA_ITEMS)
      .reverse()
      .map((media) => window.matchMedia(media));

    function checkScreen() {
      const mql = mqls.find((m) => m.matches);
      if (!mql) return;

      const argument = MEDIA_ITEMS[mql.media];
      if (!argument) return;

      fnToCall(argument);
    }

    checkScreen();
    mqls.forEach((mql) => mql.addEventListener('change', checkScreen));
    return () =>
      mqls.forEach((mql) => mql.removeEventListener('change', checkScreen));
  }, []);
};

export default useResponsiveCall;
