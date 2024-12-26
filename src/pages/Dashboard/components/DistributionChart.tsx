import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../../utils/format';

interface DistributionChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  isMobile: boolean;
}

export function DistributionChart({ data, isMobile }: DistributionChartProps) {
  return (
    <div className="h-full">
      <h2 className="text-lg font-bold text-white mb-4">Distribuição de Receitas</h2>
      <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={isMobile ? 40 : 60}
            outerRadius={isMobile ? 70 : 90}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrency(Number(value))}
            contentStyle={{
              backgroundColor: '#1C1C1C',
              border: '1px solid #333',
            }}
          />
          <Legend
            verticalAlign={isMobile ? 'bottom' : 'middle'}
            align={isMobile ? 'center' : 'right'}
            layout={isMobile ? 'horizontal' : 'vertical'}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
