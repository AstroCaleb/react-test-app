import React, { useContext, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AppContext } from './AppProvider';
import { useLaunchData } from './hooks/useLaunchData';
import { LaunchList } from './components/LaunchList';
import { LaunchDetails } from './components/LaunchDetails';

const App: React.FC = () => {
  const { setLaunchData } = useContext(AppContext);
  const [safeToRender, setSafeToRender] = useState<boolean>(false);
  const { launchData, isLoading, isError, error } = useLaunchData();

  useEffect(() => {
    if (!isLoading && !isError) {
      setSafeToRender(true);
      setLaunchData(launchData);
    }
  }, [launchData]);

  return (
    <>
      <h1>Upcoming Launches</h1>
      {isLoading && <p>Loading...</p>}
      {isError && (
        <p>
          <strong>Error occurred!</strong>
          <br />
          Please try again.
          <br />
          <small>
            <em>{error.message}</em>
          </small>
        </p>
      )}
      {safeToRender && <LaunchList launchData={launchData} />}
    </>
  );
};

export const AppWrapper: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:id" element={<LaunchDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
