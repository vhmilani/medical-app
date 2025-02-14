import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [role, setrole] = useState('');
  const [previousScreen, setPreviousScreen] = useState(null);

  return (
    <GlobalContext.Provider value={{ role, setrole, previousScreen, setPreviousScreen }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);