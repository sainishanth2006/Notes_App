import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/utils/axios";
import Navbar from "../components/navbar.jsx";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col justify-center">
        <div className="mb-6">
          <Link to={"/"} className="btn btn-ghost text-base-content/80 hover:text-primary">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
        </div>

        <div className="rounded-lg border border-primary/20 bg-base-100/95 p-1 shadow-2xl shadow-primary/10">
          <div className="rounded-md border border-base-content/10 bg-base-100 p-6 sm:p-8">
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
                New note
              </p>
              <h2 className="text-3xl font-bold text-base-content">Capture an idea</h2>
              <p className="mt-3 text-base text-base-content/60">
                Add a title and the details you want to remember.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Give your note a name"
                  className="input input-bordered w-full bg-base-200/70 focus:border-primary focus:outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered min-h-48 w-full resize-none bg-base-200/70 leading-relaxed focus:border-primary focus:outline-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <Link to={"/"} className="btn btn-ghost">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Note"}
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
export default CreatePage;
