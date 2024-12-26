import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../../../utils/format';

interface FizzChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  title: string;
  description: string;
}

export function FizzChart({ data, title, description }: FizzChartProps) {
  return (
    <div className="bg-[#1C1C1C] p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{ backgroundColor: '#1C1C1C', border: 'none' }}
              itemStyle={{ color: '#C0C0C0' }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span style={{ color: '#C0C0C0' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-400 mt-4 text-center">{description}</p>
    </div>
  );
}
