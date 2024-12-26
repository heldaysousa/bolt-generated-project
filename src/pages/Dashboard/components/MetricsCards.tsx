import React from 'react';
import { Card } from '../../../components/ui/Card';
import { DollarSign, Target, Calendar } from 'lucide-react';
import { formatCurrency } from '../../../utils/format';

interface MetricsCardsProps {
  dailyRevenue: number;
  monthlyRevenue: number;
  dailyGoal: number;
  monthlyGoal: number;
  appointmentsToday: number;
}

export function MetricsCards({
  dailyRevenue,
  monthlyRevenue,
  dailyGoal,
  monthlyGoal,
  appointmentsToday,
}: MetricsCardsProps) {
  const dailyProgress = (dailyRevenue / dailyGoal) * 100;
  const monthlyProgress = (monthlyRevenue / monthlyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <Card
        title="Faturamento Hoje"
        value={formatCurrency(dailyRevenue)}
        icon={<DollarSign className="w-6 h-6" />}
        color="rose"
      />
      
      <Card
        title="Faturamento Mensal"
        value={formatCurrency(monthlyRevenue)}
        icon={<DollarSign className="w-6 h-6" />}
        color="blue"
      />
      
      <Card
        title="Meta Diária"
        value={`${dailyProgress.toFixed(1)}%`}
        subtitle={formatCurrency(dailyGoal)}
        icon={<Target className="w-6 h-6" />}
        color="purple"
      />
      
      <Card
        title="Meta Mensal"
        value={`${monthlyProgress.toFixed(1)}%`}
        subtitle={formatCurrency(monthlyGoal)}
        icon={<Target className="w-6 h-6" />}
        color="green"
      />

      <Card
        title="Agendamentos Hoje"
        value={appointmentsToday}
        icon={<Calendar className="w-6 h-6" />}
        color="rose"
      />
    </div>
  );
}
