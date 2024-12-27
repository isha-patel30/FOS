import React, {createContext, useContext, useMemo, useState} from 'react';
const context = createContext();

export const MainContextProvider = props => {
  const [userName, setUserName] = useState('');
  const [id, setId] = useState([]);
  const [isTablet, setIsTablet] = useState(false);

  const value = useMemo(() => {
    return {
      userName: userName,
      setUserName: setUserName,
      id: id,
      setId: setId,
      isTablet: isTablet,
      setIsTablet: setIsTablet,
    };
  }, [userName, setUserName, id, setId, isTablet, setIsTablet]);

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export const useMainContext = () => {
  const value = useContext(context);
  if (value === undefined)
    throw new Error('Tried to use context without a provider');
  return value;
};
