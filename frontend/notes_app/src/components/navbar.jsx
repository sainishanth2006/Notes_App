import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-primary/10 bg-black/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to={"/"} className="font-mono text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            ThinkBoard
          </Link>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary rounded-md shadow-lg shadow-primary/20">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
