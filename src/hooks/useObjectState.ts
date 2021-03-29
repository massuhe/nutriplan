import { useState } from 'react';

type AnyObject = { [index: string]: any };

const useObjectState = (
  initialState: () => AnyObject | AnyObject
): [AnyObject, (newState: AnyObject) => void] => {
  const [state, setState] = useState<AnyObject>(initialState);

  const setObjectState = (newState: AnyObject) => {
    setState({ ...state, ...newState });
  };

  return [state, setObjectState];
};

export default useObjectState;
