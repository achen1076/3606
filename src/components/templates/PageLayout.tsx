import React, { ReactNode } from "react";
import Header from "../parts/header.tsx";
import Footer from "../parts/footer.tsx";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className="overflow-x-hidden bg-black min-h-screen">
      <Header />
      <div className="absolute top-20 left-20 text-white text-xs font-serif italic opacity-70 transform translate-y-1/2 translate-x-1/8">
        made by achen (3606/1606)
      </div>
      <main
        className={`flex flex-col w-full pt-24 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto ${className}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
