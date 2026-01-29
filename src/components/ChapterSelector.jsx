import "bootstrap-icons/font/bootstrap-icons.css";

function ChapterSelector(props) {
  return (
    <button className="chapter-Selector">
      <i className="bi bi-list-task"></i>
      <p>{`Chapter ${props.currentChapter}`}</p>
    </button>
  );
}

export default ChapterSelector;
