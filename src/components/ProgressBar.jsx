const ProgressBar = ({ trackTotalTime, trackCurrentTime }) => {
  // Add this line to see exactly what is coming in
  console.log("Incoming Total Time:", trackTotalTime, typeof trackTotalTime);
  const timeFormat = (timeInSeconds) => {
    // 1. Convert input to a number explicitly first
    const seconds = Number(timeInSeconds);

    // 2. Check the CONVERTED variable (seconds), not the original argument
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "00:00";
    }

    const time = new Date(null);
    time.setSeconds(seconds); // Use the converted 'seconds' here too
    return time.toISOString().slice(14, 19);
  };

  return (
    <section className="progress-bar">
      <div className="total-progress">
        <div
          className="current-progress"
          style={{ width: `${(trackCurrentTime * 100) / trackTotalTime}%` }}
        ></div>
        <div
          className="position-marker"
          style={{
            left: `${(trackCurrentTime * 100) / trackTotalTime}%`,
          }}
        ></div>
      </div>
      <div className="time-stamps">
        <p>{timeFormat(trackCurrentTime)}</p>
        <p>{timeFormat(trackTotalTime)}</p>
      </div>
    </section>
  );
};
export default ProgressBar;
