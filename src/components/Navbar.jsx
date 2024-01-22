import { useState } from "react";
import { FaBars, FaRegPlayCircle, FaRegStopCircle } from "react-icons/fa";
import logo from "../logo.svg";

export default function Navbar({play, setPlay}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Mobile menu */}

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <FaBars className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src={logo} alt="" />
                </a>
              </div>

              <div className="ml-auto flex items-center">
                {/* Run and compile button */}
                <div className=" ml-4 flow-root lg:ml-6">
                  <div className="flex space-x-1">
                    <a href="#" className="group -m-2 flex items-center p-2">
                      <FaRegPlayCircle
                        className="h-6 w-6 flex-shrink-0 text-green-400 group-hover:text-green-500"
                        aria-hidden="true"
                      />
                    </a>
                    <a href="#" className="group -m-2 flex items-center p-2">
                      <FaRegStopCircle
                        className="h-6 w-6 flex-shrink-0 text-red-400 group-hover:text-red-500"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
