import { useState } from 'react';

type anyObject = { [index: string]: any };

const useObjectState = (
  initialState: () => anyObject | anyObject
): [anyObject, (newState: anyObject) => void] => {
  const [state, setState] = useState<anyObject>(initialState);

  const setObjectState = (newState: anyObject) => {
    setState({ ...state, ...newState });
  };

  return [state, setObjectState];
};

export default useObjectState;
