import { ArrowLeftIcon, LoaderIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/utils/axios";
import Navbar from "../components/navbar.jsx";

const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.log("Error fetching note", error);
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`,{
        title: note.title,
        content: note.content,
      });

      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving note", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
          <div className="rounded-lg border border-primary/20 bg-base-100/80 px-6 py-5 text-center shadow-xl shadow-primary/10">
            <LoaderIcon className="mx-auto mb-3 size-8 animate-spin text-primary" />
            <p className="text-base-content/70">Loading note...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
          <div className="max-w-md rounded-lg border border-primary/20 bg-base-100/90 p-8 text-center shadow-xl shadow-black/20">
            <h2 className="text-2xl font-bold">Note not found</h2>
            <p className="mt-3 text-base-content/70">
              This note is unavailable or may have been deleted.
            </p>
            <Link to={"/"} className="btn btn-primary mt-6">
              Back to Notes
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to={"/"} className="btn btn-ghost text-base-content/80 hover:text-primary">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <button onClick={handleDelete} className="btn btn-ghost text-error hover:bg-error/10">
            <Trash2Icon className="size-5" />
            Delete Note
          </button>
        </div>

        <div className="rounded-lg border border-primary/20 bg-base-100/95 p-1 shadow-2xl shadow-primary/10">
          <div className="rounded-md border border-base-content/10 bg-base-100 p-6 sm:p-8">
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
                Edit note
              </p>
              <h2 className="text-3xl font-bold text-base-content">Refine the details</h2>
              <p className="mt-3 text-base text-base-content/60">
                Save the changes you want to keep.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-200/70 focus:border-primary focus:outline-none"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered min-h-64 w-full resize-none bg-base-200/70 leading-relaxed focus:border-primary focus:outline-none"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="btn btn-primary rounded-md shadow-lg shadow-primary/20" disabled={saving}>
                  <SaveIcon className="size-5" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
};

export default NoteDetail;
