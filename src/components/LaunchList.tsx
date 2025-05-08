import React from 'react';
import { LaunchData } from '../hooks/useLaunchData';
import { LaunchListItem } from './LaunchListItem';

interface LaunchListProps {
  launchData: LaunchData[];
}

export const LaunchList: React.FC<LaunchListProps> = ({ launchData }) => {
  return (
    <div className="launch-list">
      {launchData.map((item: any) => (
        <LaunchListItem key={item.id} launchInfo={item} />
      ))}
    </div>
  );
}
