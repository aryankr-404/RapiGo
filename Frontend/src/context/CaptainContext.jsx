import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: ''
    }
  });

  return (
    <div>
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
    </div>
  );
};

export default CaptainContext;