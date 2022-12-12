import { Link, useNavigate } from "react-router-dom";

export default function MainNavigation() {
  const navigator = useNavigate();

  return (
    <nav className="container fixed">
      <div className="left">
        <div className="logo">
          <Link to="/">
            <h3>NoteBook.</h3>
          </Link>
        </div>
      </div>

      <button
        className="yellow"
        onClick={() => {
          navigator("/notes");
        }}
      >
        My Notes
      </button>
    </nav>
  );
}
