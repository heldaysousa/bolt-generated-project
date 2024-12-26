import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: 'rose' | 'blue' | 'green' | 'purple';
}

export function Card({ title, value, subtitle, icon, color }: CardProps) {
  const colorClasses = {
    rose: 'bg-[#1C1C1C] text-[#C0C0C0]',
    blue: 'bg-[#1C1C1C] text-[#C0C0C0]',
    green: 'bg-[#1C1C1C] text-[#C0C0C0]',
    purple: 'bg-[#1C1C1C] text-[#C0C0C0]',
  };

  return (
    <div className={`${colorClasses[color]} p-6 rounded-lg shadow-sm`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-opacity-20">
            {icon}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-[#C0C0C0]">{title}</p>
            <p className="text-2xl font-semibold text-white">{value}</p>
            {subtitle && (
              <p className="text-sm text-[#C0C0C0]">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
