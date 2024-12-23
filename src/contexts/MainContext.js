import React, {createContext, useContext, useMemo, useState} from 'react';
const context = createContext();

export const MainContextProvider = props => {
  const [userName, setUserName] = useState('');
  const [id, setId] = useState([]);

  const value = useMemo(() => {
    return {
      userName: userName,
      setUserName: setUserName,
      id: id,
      setId: setId,
    };
  }, [userName, setUserName, id, setId]);

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export const useMainContext = () => {
  const value = useContext(context);
  if (value === undefined)
    throw new Error('Tried to use context without a provider');
  return value;
};
