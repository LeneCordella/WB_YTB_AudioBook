const ProgressBox = ({
  trackTotalTime,
  trackCurrentTime,
  forwardTo,
  refProgressBar,
}) => {
  // Add this line to see exactly what is coming in
  console.log("Incoming Total Time:", trackTotalTime, typeof trackTotalTime);
  const timeFormat = (timeInSeconds) => {
    const tempo = new Date(null);
    tempo.setSeconds(timeInSeconds);
    return tempo.toISOString().slice(14, 19);
  };

  return (
    <section className="progress-box" onClick={forwardTo}>
      <div className="total-progress" ref={refProgressBar} onClick={forwardTo}>
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
export default ProgressBox;
