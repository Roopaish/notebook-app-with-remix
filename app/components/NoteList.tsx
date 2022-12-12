import type { LinksFunction } from "@remix-run/node";
import type { FC } from "react";
import { Link } from "react-router-dom";
import type { INote } from "~/types/note";
import styles from "./styles/NoteList.css";

type NoteListProps = {
  notes: INote[];
};

const NoteList: FC<NoteListProps> = ({ notes }) => {
  return (
    <div className="notes">
      {notes.map((note) => (
        <Link to={"/notes/" + note.id} key={note.id} className="note">
          <p className="date">
            {new Date(note.id).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </Link>
      ))}
    </div>
  );
};

export default NoteList;

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
