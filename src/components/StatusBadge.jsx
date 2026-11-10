import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';

const StatusBadge = ({ status, size = 'sm', showIcon = true }) => {
  const getBadgeConfig = () => {
    switch (status?.toLowerCase()) {
      case 'recovered':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          icon: CheckCircle2,
          label: 'Recovered'
        };
      case 'returned':
        return {
          bg: 'bg-teal-50 text-teal-700 border-teal-200',
          dot: 'bg-teal-500',
          icon: ShieldCheck,
          label: 'Returned to Owner'
        };
      case 'potential match':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dot: 'bg-indigo-500 animate-pulse',
          icon: Sparkles,
          label: 'Potential Match'
        };
      case 'active':
      default:
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
          icon: Clock,
          label: 'Active Report'
        };
    }
  };

  const config = getBadgeConfig();
  const IconComponent = config.icon;

  const sizeClasses = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${sizeClasses[size] || sizeClasses.sm}`}
    >
      {showIcon && <IconComponent className="w-3.5 h-3.5" />}
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;

