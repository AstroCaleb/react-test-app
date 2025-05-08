import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { intervalToDuration } from 'date-fns';
import { LaunchData } from '../hooks/useLaunchData';
import * as util from '../shared/util';

interface LaunchListItemProps {
  launchInfo: LaunchData
}

export const LaunchListItem: React.FC<LaunchListItemProps> = ({ launchInfo }) => {
  const navigate = useNavigate();
  const [timeToLaunch, setTimeToLaunch] = useState('---');

  // START - Update time to launch so the seconds count is accurate
  const updateTimeToLaunch = () => {
    const int = intervalToDuration({
      start: new Date(),
      end: launchInfo.window_start
    });
    setTimeToLaunch(`${int.days ?? 0} days, ${int.hours ?? 0} hours, ${int.minutes ?? 0} minutes, ${int.seconds ?? 0} seconds`);
  }

  useEffect(() => {
    updateTimeToLaunch();
    const timer = setInterval(() => {
      updateTimeToLaunch();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [intervalToDuration, launchInfo]);
  // END - Update time to launch so the seconds count is accurate

  return (
    <div className="launch-item">
      <div className="launch-image-wrapper">
        <div className="launch-image" style={{
          backgroundImage: `url(${launchInfo.image})`
        }}></div>
      </div>
      <div className="launch-info">
        <div className="launch-header">
          <h2>{launchInfo.mission.name}</h2>
          <h3>{launchInfo.rocket.configuration.name}</h3>
        </div>
        <p><strong>Status:</strong> <em>{launchInfo.status.name}</em></p>
        <p>{timeToLaunch}</p>
        <button onClick={() => navigate(`/${launchInfo.id}`)}>View Details</button>
      </div>
    </div>
  );
}
