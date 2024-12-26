import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { Transaction, TransactionFilter } from '../types';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = useCallback(async (filter: TransactionFilter) => {
    setIsLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('transactions')
        .select('*')
        .gte('date', filter.startDate)
        .lte('date', filter.endDate)
        .order('date', { ascending: false });

      if (filter.type !== 'all') {
        query = query.eq('type', filter.type);
      }

      const { data, error: queryError } = await query;
      if (queryError) throw queryError;
      
      setTransactions(data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTransaction = useCallback(async (transaction: Omit<Transaction, 'id'>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('transactions')
        .insert([transaction]);
      if (error) throw error;
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    transactions,
    isLoading,
    error,
    loadTransactions,
    addTransaction
  };
}
