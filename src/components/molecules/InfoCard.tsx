import React from "react";

interface InfoCardProps {
  title: string;
  value: string | number;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  className = "",
}) => {
  return (
    <div
      className={`bg-black/30 p-5 w-[100%] rounded-lg text-center ${className}`}
    >
      <h3 className="text-rok-purple-light text-xl font-bold mb-2">{title}</h3>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
};

export default InfoCard;
