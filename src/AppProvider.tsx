import React, { createContext, PropsWithChildren, useState, } from 'react';

interface AppProviderProps {
  launchData: any;
  setLaunchData: React.Dispatch<React.SetStateAction<any>>;
}

export const AppContext = createContext<AppProviderProps>({
  launchData: {},
  setLaunchData: () => { },
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [launchData, setLaunchData] = useState<any>({});

  return (
    <AppContext.Provider
      value={{
        launchData,
        setLaunchData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
