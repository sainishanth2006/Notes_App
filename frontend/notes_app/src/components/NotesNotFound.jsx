import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-lg border border-primary/15 bg-base-100/80 px-6 py-16 text-center shadow-xl shadow-black/20">
      <div className="rounded-full border border-primary/20 bg-primary/10 p-6">
        <NotebookIcon className="size-12 text-primary" />
      </div>
      <h3 className="mt-6 text-2xl font-bold">No notes yet</h3>
      <p className="mt-3 max-w-sm text-base-content/70">
        Start with a title, add the details, and keep the thought close.
      </p>
      <Link to="/create" className="btn btn-primary mt-6 rounded-md shadow-lg shadow-primary/20">
        Create Your First Note
      </Link>
    </div>
  );
};
export default NotesNotFound;
