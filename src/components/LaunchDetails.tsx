import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { format, intervalToDuration } from 'date-fns';
import { AppContext } from '../AppProvider';
import { LaunchData } from '../hooks/useLaunchData';
import * as util from '../shared/util';

export const LaunchDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { launchData } = useContext(AppContext);
  const [timeToLaunch, setTimeToLaunch] = useState("---");
  const launchInfo = launchData.find((item: LaunchData) => item.id === id);

  // START - Update time to launch so the seconds count is accurate
  const updateTimeToLaunch = () => {
    const int = intervalToDuration({
      start: new Date(),
      end: launchInfo.window_start,
    });
    setTimeToLaunch(
      `${int.days ?? 0} days, ${int.hours ?? 0} hours, ${int.minutes ?? 0} minutes, ${int.seconds ?? 0} seconds`,
    );
  };

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

  useEffect(() => {
    if (!launchData.length) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <button onClick={() => navigate()}>← Back to list</button>
      <div className="launch-details">
        <div className="launch-image-wrapper">
          <div
            className="launch-image"
            style={{
              backgroundImage: `url(${launchInfo?.image})`,
            }}
          ></div>
        </div>
        <div className="launch-info">
          <h2>{launchInfo.mission.name}</h2>
          <div className="detail-status-section">
            <p>Rocket:</p>
            <h3>{launchInfo.rocket.configuration.full_name}</h3>
          </div>
          <div className="detail-status-section">
            <p>Status:</p>
            <h3>{launchInfo.status.name}</h3>
          </div>
          <div className="detail-status-section">
            <p>T-0:</p>
            <h3>{timeToLaunch}</h3>
            <p>
              <em>
                {format(launchInfo.window_start, "d MMMM yyyy HH:mm:ss")}
              </em>
            </p>
          </div>
          <p>{launchInfo.mission.description}</p>
        </div>
      </div>
    </>
  );
};
