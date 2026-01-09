import "./App.css";
import brasCubasImg from "./assets/bras_cubas.jpeg";
import Cover from "./components/Cover";

function App() {
  const bookInfo = {
    title: "Memórias Póstumas de Brás Cubas",
    author: "Machado de Assis",
    chapterCount: 2,
    coverPic: brasCubasImg,
    altCaption: "Memórias Póstumas de Brás Cubas' cover",
  };

  return (
    <>
      <Cover coverPic={bookInfo.coverPic} altCaption={bookInfo.altCaption} />
    </>
  );
}

export default App;
