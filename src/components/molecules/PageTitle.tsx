import React from "react";

interface PageTitleProps {
  title: string;
  highlightedText?: string;
  subtitle?: string;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  highlightedText,
  subtitle,
  className = "",
}) => {
  return (
    <section className={`w-full py-8 md:py-12 ${className}`}>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {title}{" "}
        {highlightedText && (
          <span className="text-rok-purple-light">{highlightedText}</span>
        )}
      </h1>
      {subtitle && <p className="text-lg text-gray-300">{subtitle}</p>}
    </section>
  );
};

export default PageTitle;
