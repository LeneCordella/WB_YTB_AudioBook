import { useState, useRef, useEffect } from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import brasCubasImg from "./assets/bras_cubas.jpeg";
import ChapterSelector from "./components/ChapterSelector";
import ControlButtons from "./components/ControlButtons";
import TrackManager from "./components/TrackManager";
import Cover from "./components/Cover";
import book from "./assets/chapters/Book.js";
import ProgressBox from "./components/ProgressBox.jsx";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [trackTotalTime, setTrackTotalTime] = useState(0);
  const [trackCurrentTime, setTrackCurrentTime] = useState(0);
  const refTagAudio = useRef(null);
  const progressBar = useRef(null);

  useEffect(() => {
    if (!refTagAudio.current) return;
    refTagAudio.current.load();
    console.log("chapter changed to", currentChapter);
    if (isPlaying) {
      refTagAudio.current
        .play()
        .catch((e) => console.warn("play failed on chapter change", e));
    }
  }, [currentChapter]);

  useEffect(() => {
    if (!refTagAudio.current) return;
    if (isPlaying) {
      refTagAudio.current.play().catch((e) => console.warn("play failed", e));
    } else {
      refTagAudio.current.pause();
    }
  }, [isPlaying]);

  const bookInfo = {
    title: "Memórias Póstumas de Brás Cubas",
    author: "Machado de Assis",
    chapterCount: 2,
    chapters: book,
    coverPic: brasCubasImg,
    altCaption: "Memórias Póstumas de Brás Cubas' cover",
  };

  const previousTrack = () => {
    const next =
      currentChapter === 0 ? bookInfo.chapterCount - 1 : currentChapter - 1;
    console.log("previousTrack: moving to", next);
    setCurrentChapter(next);
  };

  function playTrack() {
    if (!refTagAudio.current) {
      console.warn("playTrack: audio ref is null");
      setIsPlaying(true);
      return;
    }
    refTagAudio.current
      .play()
      .then(() => {
        setIsPlaying(true);
        console.log("playTrack: playing");
      })
      .catch((e) => {
        console.warn("play() failed", e);
        setIsPlaying(true);
      });
  }

  const pauseTrack = () => {
    if (!refTagAudio.current) {
      console.warn("pauseTrack: audio ref is null");
      setIsPlaying(false);
      return;
    }
    try {
      refTagAudio.current.pause();
    } catch (e) {
      console.warn("pause failed", e);
    }
    setIsPlaying(false);
    console.log("pauseTrack");
  };

  const playOrPause = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  };

  const nextTrack = () => {
    const next =
      bookInfo.chapterCount === currentChapter + 1 ? 0 : currentChapter + 1;
    console.log("nextTrack: moving to", next);
    setCurrentChapter(next);
  };

  const forward15s = () => {
    if (!refTagAudio.current) {
      console.warn("forward15s: audio ref is null");
      return;
    }

    const duration = refTagAudio.current.duration || Infinity;
    const newTime = Math.min(duration, refTagAudio.current.currentTime + 15);
    refTagAudio.current.currentTime = newTime;
    console.log("forward15s:", newTime);
  };

  const forwardTo = (event) => {
    const width = progressBar.current?.clientWidth || 1;
    const offset =
      event.nativeEvent?.offsetX ?? event.nativeEvent?.offsetx ?? 0;
    const newTime = (offset / width) * trackTotalTime;
    if (refTagAudio.current && !Number.isNaN(newTime)) {
      refTagAudio.current.currentTime = Math.min(
        Math.max(newTime, 0),
        trackTotalTime || Infinity,
      );
    }
    console.log("forwardTo:", newTime);
  };

  const rewind15s = () => {
    if (!refTagAudio.current) {
      console.warn("rewind15s: audio ref is null");
      return;
    }
    const newTime = Math.max(0, refTagAudio.current.currentTime - 15);
    refTagAudio.current.currentTime = newTime;
    console.log("rewind15s:", newTime);
  };

  return (
    <>
      <Cover coverPic={bookInfo.coverPic} altCaption={bookInfo.altCaption} />
      <ChapterSelector currentChapter={currentChapter + 1} />
      <TrackManager
        track={bookInfo.chapters[currentChapter]} //SeletorCapitulos capituloAtual={1}
        setTrackCurrentTime={setTrackCurrentTime}
        setTrackTotalTime={setTrackTotalTime}
        refAudioTag={refTagAudio}
      />
      <ProgressBox
        trackTotalTime={trackTotalTime}
        trackCurrentTime={trackCurrentTime}
        refProgressBar={progressBar}
        forwardTo={forwardTo}
      />
      <ControlButtons
        isPlaying={isPlaying}
        rewind15s={rewind15s}
        previousTrack={previousTrack}
        playOrPause={playOrPause}
        forward15s={forward15s}
        nextTrack={nextTrack}
      />
    </>
  );
}

export default App;
