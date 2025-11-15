import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Button from "./component-button";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-[inset_0_-0.5px_3px_#C1D0E1] fixed top-0 w-full z-50">
      <div className="flex justify-between items-center py-4 px-6 lg:px-[100px]">
        <a
          href="/"
          className="text-2xl font-bold text-[#1B54D0] font-display cursor-pointer"
        >
          GrowUMKM
        </a>
        <div className="text-3xl lg:hidden cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
        <ul className="hidden lg:flex items-center gap-5">
          <li>
            <a
              href="/"
              className={`font-display text-[15px] ${
                isActive("/")
                  ? "text-[#1B54D0] font-semibold"
                  : "text-[#486284] hover:text-[#012167]"
              } duration-300`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/daftar-umkm"
              className={`font-display text-[15px] ${
                isActive("/daftar-umkm")
                  ? "text-[#1B54D0] font-semibold"
                  : "text-[#486284] hover:text-[#012167]"
              } duration-300`}
            >
              Daftar UMKM
            </a>
          </li>

          <div className="flex gap-3">
            {isLoggedIn ? (
              <Link to={"/profile-umkm"}>
                <FaRegUserCircle className="text-[#1B54D0]" size={30} width={0.5}/>
              </Link>
            ) : (
              <>
                <Button
                  variant="outlined"
                  href={"/profile-umkm"}
                  className="text-sm px-5 py-[6px] lg:py-[5px]"
                >
                  Masuk
                </Button>
                <Button
                  variant="filled"
                  href={"/register-page"}
                  className="text-sm px-5 py-[6px] lg:py-[5px]"
                >
                  Daftar
                </Button>
              </>
            )}
          </div>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-start gap-4 px-6 py-4">
          <li>
            <a
              href="/"
              onClick={closeMenu}
              className={`font-display text-[15px] ${
                isActive("/")
                  ? "text-[#1B54D0] font-semibold"
                  : "text-[#486284] hover:text-[#012167]"
              } duration-300`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/daftar-umkm"
              onClick={closeMenu}
              className={`font-display text-[15px] ${
                isActive("/daftar-umkm")
                  ? "text-[#1B54D0] font-semibold"
                  : "text-[#486284] hover:text-[#012167]"
              } duration-300`}
            >
              Daftar UMKM
            </a>
          </li>

          <div className="flex flex-col w-full gap-3 lg:mt-3">
            {isLoggedIn ? (
              <a
                href="/profile-umkm"
                className={`font-display text-[15px] ${
                  isActive("/profile-umkm")
                    ? "text-[#1B54D0] font-semibold"
                    : "text-[#486284] hover:text-[#012167]"
                } duration-300`}
              >
                Account
              </a>
            ) : (
              <>
                <Button
                  variant="outlined"
                  href={"/profile-umkm"}
                  className="w-full text-sm py-2"
                  onClick={closeMenu}
                >
                  Masuk
                </Button>
                <Button
                  variant="filled"
                  href={"/register-page"}
                  className="w-full text-sm py-2"
                  onClick={closeMenu}
                >
                  Daftar
                </Button>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
