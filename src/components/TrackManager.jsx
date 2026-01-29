const TrackManager = ({
  track,
  refAudioTag,
  setTrackCurrentTime,
  setTrackTotalTime,
}) => {
  return (
    <audio
      src={track}
      ref={refAudioTag}
      onLoadedMetadata={() => setTrackTotalTime(refAudioTag.current.duration)}
      onTimeUpdate={() => setTrackCurrentTime(refAudioTag.current.currentTime)}
    />
  );
};

export default TrackManager;
