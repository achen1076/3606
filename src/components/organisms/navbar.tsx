import React, { useState, useEffect } from "react";
import { cn } from "../../constants/globalFunctions.tsx";
import { Link, useNavigate } from "react-router-dom";
import NavLink from "../molecules/NavLink.tsx";
import useWindowSize from "../../hooks/useWindowSize.tsx";
import { useAuth } from "../../contexts/AuthContext.tsx";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary";
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile, isTablet } = useWindowSize();
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "bg-rok-purple text-white w-[90%] ml-[5%] mt-3 rounded-2xl transition-all duration-300 fixed top-0 left-0 z-50 shadow-lg",
        isMenuOpen && (isMobile || isTablet) ? "h-auto pb-4" : "h-16",
        className
      )}
      {...props}
    >
      <div className="w-full px-6 h-full">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold pl-2 flex items-center">
              <span className="text-white">Kingdom </span>
              <span className="text-rok-purple-light ml-1">3606</span>
              <span className="text-white ml-1 font-serif opacity-90 text-sm">
                (made by achen)
              </span>
            </Link>
          </div>

          {isMobile || isTablet ? (
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          ) : (
            <div className="flex space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/stats">Stats</NavLink>
              <NavLink to="/leads">Leads</NavLink>
              <NavLink to="/tools">Tools</NavLink>
              {/* <NavLink to="/barbfortrally">Barb Fort Rally Data</NavLink> */}
              <NavLink to="/harequirements">HA Requirements</NavLink>
              {/* <NavLink to="/crystaltech">Crystal Tech</NavLink> */}
              <NavLink to="/forms">Forms</NavLink>
              <a
                href="https://discord.gg/3606"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-rok-purple-light transition-colors"
              >
                Discord
              </a>
              {isLoggedIn ? (
                <div className="flex items-center space-x-6">
                  <span className="text-rok-purple-light">
                    {user?.displayName}
                  </span>
                  {user?.role === "admin" && (
                    <NavLink to="/admin">Admin</NavLink>
                  )}
                  <NavLink to="/logout">Logout</NavLink>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {(isMobile || isTablet) && isMenuOpen && (
          <div className="flex flex-col space-y-4 mt-2 px-2 animate-fadeIn justify-end">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/stats">Stats</NavLink>
            <NavLink to="/leads">Leads</NavLink>
            <NavLink to="/tools">Tools</NavLink>
            <NavLink to="/barbfortrally">Barb Fort Rally Data</NavLink>
            <NavLink to="/harequirements">HA Requirements</NavLink>
            {/* <NavLink to="/crystaltech">Crystal Tech</NavLink> */}
            <NavLink to="/forms">Forms</NavLink>
            <a
              href="https://discord.gg/3606"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-rok-purple-light py-2"
            >
              Discord
            </a>
            {isLoggedIn ? (
              <>
                <span className="text-rok-purple-light py-2">
                  {user?.displayName}
                </span>
                {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
                <NavLink to="/logout">Logout</NavLink>
              </>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
