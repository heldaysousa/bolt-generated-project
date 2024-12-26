import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DollarSign, Target, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function Dashboard() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  // ... rest of the component code

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metrics cards */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`bg-[#1C1C1C] p-4 rounded-lg ${isMobile ? 'h-[300px]' : 'h-[400px]'}`}>
          <RevenueChart data={revenueData} isMobile={isMobile} />
        </div>
        <div className={`bg-[#1C1C1C] p-4 rounded-lg ${isMobile ? 'h-[300px]' : 'h-[400px]'}`}>
          <DistributionChart data={distributionData} isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
}
