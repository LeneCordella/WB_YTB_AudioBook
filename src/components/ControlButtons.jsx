import "bootstrap-icons/font/bootstrap-icons.css";

const ControlButtons = ({ previousTrack, rewind15s, playOrPause, forward15s, nextTrack, isPlaying }) => {
  return (
    <div className="buttons-container">
      <button onClick={() => { console.log('previousTrack clicked'); previousTrack?.(); }}>
        <i className="bi bi-skip-start"></i>
      </button>
      <button onClick={() => { console.log('rewind15s clicked'); rewind15s?.(); }}>
        <i className="bi bi-arrow-counterclockwise"></i>
      </button>
      <button onClick={() => { console.log('playOrPause clicked'); playOrPause?.(); }}>
        <i className={`bi bi-${isPlaying ? "pause" : "play"}-circle-fill`}></i>
      </button>

      <button onClick={() => { console.log('forward15s clicked'); forward15s?.(); }}>
        <i className="bi bi-arrow-clockwise"></i>
      </button>
      <button onClick={() => { console.log('nextTrack clicked'); nextTrack?.(); }}>
        <i className="bi bi-skip-end"></i>
      </button>
    </div>
  );
};
export default ControlButtons;
