import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  changePercent?: number;
  icon?: React.ReactNode;
  className?: string;
  comparisonPeriod?: string;
}

export function MetricCard({
  title,
  value,
  changePercent,
  icon,
  className = "",
  comparisonPeriod = "last period",
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (changePercent === undefined) return null;
    if (changePercent > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (changePercent < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (changePercent === undefined) return "text-gray-600";
    if (changePercent > 0) return "text-green-600";
    if (changePercent < 0) return "text-red-600";
    return "text-gray-600";
  };

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        {icon && (
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {formatValue(value)}
          </div>
          
          {changePercent !== undefined && (
            <div className={`flex items-center space-x-1 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>
                {changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%
              </span>
              <span className="text-slate-500">vs {comparisonPeriod}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}