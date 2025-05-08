import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'

interface LaunchStatus {
  id: string;
  name: string;
  abbrev: string;
  description: string;
}

interface LaunchOrbit {
  id: number;
  name: string;
  abbrev: string;
}

interface LaunchAgency {
  [key: string]: string | number | boolean;
}

interface LaunchRocketConfig {
  [key: string]: string | number | boolean;
}

interface LaunchRocket {
  id: number;
  configuration: LaunchRocketConfig;
}

interface LaunchMission {
  id: number;
  name: string;
  description: string;
  launch_designator: string;
  type: string;
  orbit: LaunchOrbit;
  agencies: LaunchAgency[];
  info_urls: string[];
  vid_urls: string[];
}

export interface LaunchData {
  id: string;
  name: string;
  status: LaunchStatus;
  window_start: string;
  rocket: LaunchRocket;
  mission: LaunchMission;
  image: string;
  launch_service_provider: string;
  webcast_live: boolean;
}

export const useLaunchData = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['launches'],
    queryFn: () => axios.get('https://ll.thespacedevs.com/2.2.0/launch/?status__ids=1,8').then(res => res.data),
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  const launchData = React.useMemo(() => {
    if (data) {
      return data.results.map((launch: any) => ({
        id: launch.id,
        name: launch.name,
        status: launch.status,
        window_start: launch.window_start,
        rocket: launch.rocket,
        mission: launch.mission,
        image: launch.image,
        launch_service_provider: launch.launch_service_provider,
        webcast_live: launch.webcast_live
      }))
    }
  }, [data]);

  return {
    launchData,
    isLoading,
    isError,
    error
  };
}
