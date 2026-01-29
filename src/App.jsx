import { useState, useRef, useEffect } from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import brasCubasImg from "./assets/bras_cubas.jpeg";
import ChapterSelector from "./components/ChapterSelector";
import ControlButtons from "./components/ControlButtons";
import TrackManager from "./components/TrackManager";
import Cover from "./components/Cover";
import book from "./assets/chapters/Book.js";
import ProgressBar from "./components/ProgressBar.jsx";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [trackTotalTime, setTrackTotalTime] = useState(0);
  const [trackCurrentTime, setTrackCurrentTime] = useState(0);
  const refTagAudio = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      playTrack();
    }
  }, [currentChapter]);

  const bookInfo = {
    title: "Memórias Póstumas de Brás Cubas",
    author: "Machado de Assis",
    chapterCount: 2,
    chapters: book,
    coverPic: brasCubasImg,
    altCaption: "Memórias Póstumas de Brás Cubas' cover",
  };

  const previousTrack = () => {
    if (currentChapter === 0) {
      setCurrentChapter(bookInfo.chapterCount - 1);
    } else {
      setCurrentChapter(currentChapter - 1);
    }
  };

  function playTrack() {
    refTagAudio.current.play();
    setIsPlaying(true);
  }

  const pauseTrack = () => {
    refTagAudio.current.pause();
    setIsPlaying(false);
  };

  const playOrPause = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  };

  const nextTrack = () => {
    if (bookInfo.chapterCount === currentChapter + 1) {
      setCurrentChapter(0);
    } else {
      setCurrentChapter(currentChapter + 1);
    }
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
      <ProgressBar
        trackTotalTime={trackTotalTime}
        trackCurrentTime={trackCurrentTime}
      />
      <ControlButtons
        isPlaying={isPlaying}
        previousTrack={previousTrack}
        playOrPause={playOrPause}
        nextTrack={nextTrack}
      />
    </>
  );
}

export default App;
