export const nextTick = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve));

export const transitionEnd = (
  element: HTMLElement,
  timeout?: number
): Promise<void> => {
  const transitionPromise = new Promise<void>((resolve) => {
    function onTransitionEnd() {
      element.removeEventListener('transitionend', onTransitionEnd);
      resolve();
    }
    element.addEventListener('transitionend', onTransitionEnd);
  });

  if (!timeout) return transitionPromise;

  const timeoutPromise = new Promise((r) => setTimeout(r, timeout));
  return Promise.race([transitionPromise, timeoutPromise]).then();
};
