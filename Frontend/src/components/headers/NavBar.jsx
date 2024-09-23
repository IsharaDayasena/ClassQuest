import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navBg, setNavBg] = useState("bg-transparent text-white");
  const [isLogin, setIsLogin] = useState(false);
  const user = false;

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
    setIsLogin(location.pathname === "/login");
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

  return (
    <nav className={`${navBg} transition-colors duration-300`}>
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <img src="/logo1.png" className="w-20 h-20" alt="Logo" />
            <p className="font-bold text-[13px] tracking-[8px]">Explore</p>
          </div>

          <div className="hidden md:block">
            <ul className="ml-10 flex items-center space-x-4 pr-4">
              {navlinks.map((link) => (
                <li key={link.route}>
                  <NavLink
                    to={link.route}
                    className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : `${
                              navBg.includes("bg-transparent") && !isDarkMode
                                ? "text-white"
                                : "text-black dark:text-white"
                            }`
                      } hover:text-secondary duration-300`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              {user ? null : isLogin ? (
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : `${
                              navBg.includes("bg-transparent")
                                ? "text-white"
                                : "text-black dark:text-white"
                            }`
                      } hover:text-secondary duration-300`
                    }
                  >
                    Register
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : `${
                              navBg.includes("bg-transparent")
                                ? "text-white"
                                : "text-black dark:text-white"
                            }`
                      } hover:text-secondary duration-300`
                    }
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
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
    </nav>
  );
};

export default NavBar;
