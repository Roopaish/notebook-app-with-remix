import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { getStoredNotes } from "~/data/notes";
import type { INote } from "~/types/note";

export default function NoteDetailsPage() {
  const note: INote = useLoaderData();
  return (
    <main
      className="container page"
      style={{ maxWidth: 1000, margin: "0 auto" }}
    >
      <div>
        <Link to="/notes">&larr; Back to notes</Link>
      </div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </main>
  );
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.title || "Note Details",
    description: data.content || "Notes description",
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const notes = await getStoredNotes();
  return notes.find((note) => note.id === params.noteid);
};
