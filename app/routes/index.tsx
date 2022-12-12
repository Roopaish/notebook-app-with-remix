import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigator = useNavigate();

  return (
    <main className="content page" style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 30 }}>
        A better way to keep track of your notes
      </h2>
      <button
        className="yellow"
        onClick={() => {
          navigator("/notes");
        }}
      >
        Try Now!
      </button>
    </main>
  );
}
