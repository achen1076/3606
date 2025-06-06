import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  className = "",
}) => {
  return (
    <div className={`bg-black/30 p-5 rounded-lg text-center ${className}`}>
      <h3 className="text-rok-purple-light font-bold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
};

export default StatCard;
