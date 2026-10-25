import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 font-sans">
      <div className="flex items-center ">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-black m-0 no-underline"
        >
          Speedy
        </Link>
      </div>

      <div className="hidden md:flex gap-8">
        <Link
          to="/"
          className="text-black font-medium text-sm hover:opacity-60 transition-opacity"
        >
          Home
        </Link>
        <Link
          to="/map"
          className="text-black font-medium text-sm hover:opacity-60 transition-opacity"
        >
          Delivery Map
        </Link>
        <Link
          to="/about"
          className="text-black font-medium text-sm hover:opacity-60 transition-opacity"
        >
          About Us
        </Link>
      </div>

      <div className="flex gap-3">
        <button className="bg-black text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
          Log in
        </button>
        <button className="bg-gray-100 text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;