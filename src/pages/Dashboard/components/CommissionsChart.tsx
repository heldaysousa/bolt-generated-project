import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '../../../utils/format';

interface CommissionData {
  name: string;
  value: number;
}

interface CommissionsChartProps {
  data: CommissionData[];
}

const COLORS = ['#e11d48', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

export function CommissionsChart({ data }: CommissionsChartProps) {
  return (
    <div className="bg-[#1C1C1C] p-6 rounded-lg shadow-sm dark:bg-[#1C1C1C] dark:text-white">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Comissões da Equipe</h2>
      <div className="h-80 flex flex-col items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
          Distribuição das comissões por profissional.
        </p>
      </div>
    </div>
  );
}
