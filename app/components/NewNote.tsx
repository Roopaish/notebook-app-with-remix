import { Form, useActionData, useTransition } from "@remix-run/react";

export default function NewNote() {
  const transition = useTransition();
  const data = useActionData();

  const btnText =
    transition.state === "submitting"
      ? "Saving..."
      : transition.state === "loading"
      ? "Note Saved!"
      : "Save Note";

  return (
    <Form method="post" className="form new-note">
      <h4>New Note</h4>
      <label htmlFor="title">
        <p>Title</p>
      </label>
      <input id="title" type="text" name="title" placeholder="Note Title" />
      <label htmlFor="content">
        <p>Content</p>
      </label>
      <textarea id="content" name="content" placeholder="Note Content" />
      {data?.message && <p className="error">{data.message}</p>}
      <button className="cyan" type="submit">
        {btnText}
      </button>
    </Form>
  );
}
