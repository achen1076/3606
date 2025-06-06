import React, { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div className={`bg-gradient-to-br from-rok-purple/20 to-black rounded-lg p-6 md:p-8 shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      {children}
    </div>
  );
};

export default SectionCard;
