import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {FaBars} from "react-icons/fa" 
import {motion} from 'framer-motion'
import useAuth from '../../hooks/useAuth'; // Import your auth hook here
import photoURL from '../../assets/home/girl.jpg'

const navlinks = [
  { name: "Home", route: "/" },
  { name: "Instructors", route: "/instructors" },
  { name: "Classes", route: "/classes" },
];

const materialTheme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});

const NavBar = () => {
  const { user, logout } = useAuth(); // Get the user and logout function from auth
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navBg, setNavBg] = useState("bg-transparent text-white");
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const darkClass = "dark";
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > 100) {
      setNavBg(
        isHome
          ? "bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 text-black dark:text-white"
          : "bg-white text-black dark:bg-black dark:text-white"
      );
    } else {
      setNavBg(
        isHome
          ? "bg-transparent text-white dark:text-white"
          : "bg-white text-black dark:bg-black dark:text-white"
      );
    }
  }, [scrollPosition, isHome, isDarkMode]);

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login");
  };

  return (
    <motion.nav 
    initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}
    className={`${isHome ? navBg: " bg-white dark:bg-black backdrop:blur-2xl"} fixed top-0 transition-colors duration-500 ease-in-out w-full z-10`}
    >
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <img src="/logo1.png" className="w-20 h-20" alt="Logo" />
            <p className="font-bold text-[13px] tracking-[8px]">Explore</p>
          </div>
          
          {/* mobile menu icons */}
          <div className=" md:hidden flex items-center">
            <button type="button" onClick={toggleMobileMenu} className=" text-gray-300 hover:text-white focus:outline-none">
              <FaBars className=" h-6 w-6 hover:text-primary"/>
            </button>
          </div>

          {/* Navigation links */}
          <div className="hidden md:block text-black dark:text-white">
            <ul className="ml-10 flex items-center space-x-4 pr-4">
              {navlinks.map((link) => (
                <li key={link.route}>
                  <NavLink
                    to={link.route}
                    className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : `${navBg.includes("bg-transparent") && !isDarkMode ? "text-black" : "text-black dark:text-white"}`
                      } hover:text-secondary duration-300`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {user ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${navBg.includes("bg-transparent") && !isDarkMode ? "text-black" : "text-black dark:text-white"}`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <img
                      // src={user.photoURL || photoURL} // Show user image or fallback image
                      src={photoURL}
                      alt="User Profile"
                      className="h-[40px] rounded-full w-[40px]"
                    />
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="font-bold px-3 py-2 bg-secondary text-white rounded-xl"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${navBg.includes("bg-transparent") && !isDarkMode ? "text-black" : "text-black dark:text-white"}`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${navBg.includes("bg-transparent") && !isDarkMode ? "text-black" : "text-black dark:text-white"}`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                <ThemeProvider theme={materialTheme}>
                  <div className="flex flex-col justify-center items-center">
                    <Switch
                      checked={isDarkMode}
                      onChange={() => setIsDarkMode(!isDarkMode)}
                    />
                    <h1 className="text-[8px]">Light/Dark</h1>
                  </div>
                </ThemeProvider>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
