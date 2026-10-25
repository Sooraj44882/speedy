import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRoute, FaBolt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-[90vh] bg-gray-50 font-sans flex flex-col items-center pt-20 px-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-black tracking-tight">
          Fast Faster Fastest delivery App <br />
          <span className="text-blue-600">- speedy.</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Need to send a package across town? Speedy finds the absolute fastest
          routes to get your items delivered in minutes.
        </p>

        <div className="flex justify-center gap-4 pt-6">
          <Link
            to="/map"
            className="bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors"
          >
            Send a Package
          </Link>
          <button className="bg-gray-200 text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-300 transition-colors">
            Track Order
          </button>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full pb-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
          <div className="mb-4 text-black">
            <FaMapMarkerAlt className="text-4xl" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-black">Live Tracking</h3>
          <p className="text-gray-600 text-sm">
            Watch your package live in animation .
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
          <div className="mb-4 text-black">
            <FaRoute className="text-4xl" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-black">Smart Routing</h3>
          <p className="text-gray-600 text-sm">
            Our system finds routes to avoid traffic jams and walls.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
          <div className="mb-4 text-black">
            <FaBolt className="text-4xl" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-black">Instant Pickup</h3>
          <p className="text-gray-600 text-sm">Drivers are ready on demand. </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
