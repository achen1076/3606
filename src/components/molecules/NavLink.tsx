import React from "react";
import { cn } from "../../constants/globalFunctions.tsx";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  to: string;
  variant?: "web" | "mobile";
}

const NavLink: React.FC<NavLinkProps> = ({
  className,
  children,
  to,
  variant = "web",
  ...props
}) => {
  const location = useLocation();
  const isActive = to === location.pathname;
  const isHashLink = to.startsWith("#");

  const handleClick = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) {
      e.preventDefault();
    
    if (isHashLink) {
      e.preventDefault();
      const element = document.querySelector(to);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
      if (props.onClick) {
        props.onClick(e);
      }
    } else {
    if (isHashLink) {
        const element = document.querySelector(to);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    };

  return (
    <div className="group relative overflow-hidden cursor-pointer" onClick={() => handleClick()}>
      {isHashLink ? (
        <a
          href={to}
          className={cn(
            "px-2 py-1 font-semibold transition-all duration-300 ease-in-out",
            isActive ? "text-[#9739bf]" : "text-gray-300 hover:text-white",
            className
          )}
          onClick={handleClick}
          {...props}
        >
          {children}
        </a>
      ) : (
        <Link
          className={cn(
            "px-2 py-1 font-semibold transition-all duration-300 ease-in-out",
            isActive ? "text-[#9739bf]" : "text-gray-300 hover:text-white",
            className
          )}
          to={to}
          {...props}
        >
          {children}
        </Link>
      )}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rok-purple-light transition-all duration-300 ease-in-out group-hover:w-full"></span>
    </div>
  );
};

export default NavLink;
