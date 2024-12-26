import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../../utils/format';

interface RevenueChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
  isMobile: boolean;
}

export function RevenueChart({ data, isMobile }: RevenueChartProps) {
  return (
    <div className="h-full">
      <h2 className="text-lg font-bold text-white mb-4">Faturamento Semanal</h2>
      <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="date"
            stroke="#C0C0C0"
            tick={{ fontSize: isMobile ? 10 : 12 }}
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? 'end' : 'middle'}
            height={isMobile ? 60 : 30}
          />
          <YAxis
            stroke="#C0C0C0"
            tickFormatter={(value) => isMobile ? formatCurrency(value, true) : formatCurrency(value)}
          />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value))}
            contentStyle={{
              backgroundColor: '#1C1C1C',
              border: '1px solid #333',
            }}
          />
          <Bar dataKey="value" fill="#4B0082" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
