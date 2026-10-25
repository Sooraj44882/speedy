const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 font-sans">
      
      <div className="flex items-center ">
        <h1 className="text-2xl font-bold tracking-tight text-black m-0">
          Speedy
        </h1>
      </div>

      <div className="hidden md:flex gap-8">
        <a href="#home" className="text-black font-medium text-sm hover:opacity-60 transition-opacity">
          Home
        </a>
        <a href="#deliver" className="text-black font-medium text-sm hover:opacity-60 transition-opacity">
          Send a Package
        </a>
        <a href="#track" className="text-black font-medium text-sm hover:opacity-60 transition-opacity">
          Track
        </a>
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