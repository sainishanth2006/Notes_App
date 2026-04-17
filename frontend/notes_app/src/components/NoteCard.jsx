import { CalendarIcon, PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils/formatDate";
import api from "../lib/utils/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behaviour

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted one
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <article className="group rounded-lg border border-primary/15 bg-base-100/90 p-5 shadow-xl shadow-black/20 transition-all duration-200 hover:-translate-y-1 hover:border-primary/45 hover:shadow-primary/10">
      <Link to={`/note/${note._id}`} className="block">
        <div className="mb-4 h-1 w-16 rounded-full bg-primary transition-all duration-200 group-hover:w-24" />
        <h3 className="line-clamp-2 text-xl font-bold text-base-content">{note.title}</h3>
        <p className="mt-3 line-clamp-4 min-h-24 text-sm leading-6 text-base-content/70">
          {note.content}
        </p>
      </Link>

      <div className="mt-6 flex items-center justify-between border-t border-base-content/10 pt-4">
        <span className="inline-flex items-center gap-2 text-sm text-base-content/60">
          <CalendarIcon className="size-4 text-primary" />
          {formatDate(new Date(note.createdAt))}
        </span>
        <div className="flex items-center gap-1">
          <Link to={`/note/${note._id}`} className="btn btn-ghost btn-sm text-base-content/70 hover:text-primary">
            <PenSquareIcon className="size-4" />
          </Link>
          <button
            className="btn btn-ghost btn-sm text-base-content/70 hover:text-error"
            onClick={(e) => handleDelete(e, note._id)}
            aria-label={`Delete ${note.title}`}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
export default NoteCard;
