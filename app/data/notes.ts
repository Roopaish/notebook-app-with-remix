import fs from "fs/promises";
import type { INote } from "~/types/note";

export const getStoredNotes = async (): Promise<INote[]> => {
  const rawFileContent = await fs.readFile("notes.json", { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  const storedNotes: [INote] = data.notes ?? [];
  return storedNotes;
};

export const storeNotes = (notes: INote[]) => {
  return fs.writeFile("notes.json", JSON.stringify({ notes: notes }));
};

export const deleteNote = async (id: string) => {
  const storedNotes = await getStoredNotes();
  const filteredNotes = storedNotes.filter((note) => note.id !== id);
  await storeNotes(filteredNotes);
};
