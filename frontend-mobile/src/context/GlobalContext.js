import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [previousScreen, setPreviousScreen] = useState(null);

  return (
    <GlobalContext.Provider value={{ token, setToken,
                                     user, setUser, 
                                     previousScreen, setPreviousScreen }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);