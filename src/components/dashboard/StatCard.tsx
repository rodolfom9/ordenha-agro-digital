
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: "up" | "down";
  trendValue?: string;
  bgColor?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  bgColor = "bg-white",
}: StatCardProps) => {
  return (
    <div className={`stat-card ${bgColor}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {trendValue && (
              <span
                className={`ml-2 text-xs font-medium ${
                  trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend === "up" ? "↑" : "↓"} {trendValue}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          )}
        </div>
        <div className="p-2 rounded-lg bg-gray-50">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
