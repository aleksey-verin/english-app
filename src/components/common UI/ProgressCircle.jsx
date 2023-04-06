import React from 'react';

// eslint-disable-next-line react/prop-types
const ProgressCircle = ({ progress }) => {
  const viewedProgress = progress <= 100 ? progress : 100;

  return (
    <div className="progress-container" title={`Learning progress ${viewedProgress}%`}>
      <div className="progress" data-percentage={viewedProgress}>
        <span className="progress-left">
          <span className="progress-bar"></span>
        </span>
        <span className="progress-right">
          <span className="progress-bar"></span>
        </span>
        <div className="progress-value"></div>
      </div>
    </div>
  );
};

export default ProgressCircle;
