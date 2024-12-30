import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import NetInfo from '@react-native-community/netinfo';

const context = createContext();

export const MainContextProvider = props => {
  const [userName, setUserName] = useState('');
  const [id, setId] = useState([]);
  const [isTablet, setIsTablet] = useState(false);
  const [isConnected, setIsConnected] = useState(null);

  const value = useMemo(() => {
    return {
      userName: userName,
      setUserName: setUserName,
      id: id,
      setId: setId,
      isTablet: isTablet,
      setIsTablet: setIsTablet,
      isConnected: isConnected,
      setIsConnected: setIsConnected,
    };
  }, [
    userName,
    setUserName,
    id,
    setId,
    isTablet,
    setIsTablet,
    isConnected,
    setIsConnected,
  ]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('isConnetecd: ', state.isConnected);
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export const useMainContext = () => {
  const value = useContext(context);
  if (value === undefined)
    throw new Error('Tried to use context without a provider');
  return value;
};
