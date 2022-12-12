import type {
  ActionFunction,
  LinksFunction,
  MetaFunction,
} from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import NewNote from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";
import type { INote } from "~/types/note";

import { json } from "@remix-run/node";
import { Links, Meta, useCatch, useLoaderData } from "@remix-run/react";
import Footer from "~/components/Footer";
import MainNavigation from "~/components/MainNavigation";
import NoteList, { links as newNoteLinks } from "~/components/NoteList";

export default function Notes() {
  const notes: INote[] = useLoaderData();
  return (
    <main className="content page">
      <h1>Notes</h1>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

// load data on the server, pre-rendered page is then sent to client
export const loader: ActionFunction = async () => {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: "No notes found" },
      { status: 404, statusText: "Not Found" }
    );
  }
  return notes;
};

// Handle post requests, run server side code
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = (formData.get("title") as string).trim();
  const content = (formData.get("content") as string).trim();

  if (!title || !content) {
    return { message: "Title and Content are required" };
  }
  if (title.length < 5 || title.length > 50) {
    return { message: "Title must be between than 5 to 50 characters" };
  }
  if (content.length < 5 || content.length > 500) {
    return { message: "Content must be between than 5 to 500 characters" };
  }
  const note: INote = {
    id: new Date().toISOString(),
    title: title,
    content: content,
  };
  // const note = Object.fromEntries(formData);
  const existingNotes = await getStoredNotes();
  const newNotes = [note, ...existingNotes];
  await storeNotes(newNotes);
  return redirect("/notes");
};

export const meta: MetaFunction = () => {
  return {
    title: "Notes",
    description: "Notes description",
  };
};

export const links: LinksFunction = () => {
  return [...newNoteLinks()];
};

// Catches errors thrown in the loader function
export const CatchBoundary = () => {
  const caughtResponse = useCatch();
  const message = caughtResponse?.data?.message || "Data not found";

  return (
    <main className="content page">
      <h1>Something went wrong</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{message}</pre>
    </main>
  );
};

// Catches errors thrown in the action function
export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MainNavigation />
        <main className="content page">
          <h1>Something went wrong while working with notes.</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
        </main>
        <Footer />
      </body>
    </html>
  );
};
