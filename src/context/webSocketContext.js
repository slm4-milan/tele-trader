import {createContext, useContext, useEffect, useState} from 'react';

export const WebSocketContext = createContext({
  wss: null,
  isWSActive: false,
});

const WebSocketContextProvider = ({children}) => {
  const [wss] = useState(new WebSocket('wss://api-pub.bitfinex.com/ws/2'));
  const [isWSActive, setIsActive] = useState(false);

  useEffect(() => {
    wss.onopen = () => {
      setIsActive(true);
    }
  }, [wss])

  return <WebSocketContext.Provider value={{wss, isWSActive}}>
    {children}
  </WebSocketContext.Provider>
}
export const useChatChannelContext = () => useContext(WebSocketContext);

export default WebSocketContextProvider;