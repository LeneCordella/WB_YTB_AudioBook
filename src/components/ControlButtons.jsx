import "bootstrap-icons/font/bootstrap-icons.css";

const ControlButtons = (props) => {
  return (
    <div className="buttons-container">
      <button onClick={props.previousTrack}>
        <i className="bi bi-skip-start"></i>
      </button>
      <button>
        <i className="bi bi-arrow-counterclockwise"></i>
      </button>
      <button onClick={props.playOrPause}>
        <i
          className={`bi bi-${props.isPlaying ? "pause" : "play"}-circle-fill`}
        ></i>
      </button>

      <button>
        <i className="bi bi-arrow-clockwise"></i>
      </button>
      <button onClick={props.nextTrack}>
        <i className="bi bi-skip-end"></i>
      </button>
    </div>
  );
};
export default ControlButtons;
