import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface ApplicationCounts {
  total: number;
  completed: number;
  pending: number;
  acknowledged: number;
  processing: number;
}

export function useInsuranceStats() {
  const [stats, setStats] = useState<ApplicationCounts>({
    total: 0,
    completed: 0,
    pending: 0,
    acknowledged: 0,
    processing: 0
  });

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('status')
        .eq('producttype', 'Insurance');

      if (error) throw error;

      if (data) {
        setStats({
          total: data.length,
          completed: data.filter(app => app.status === 'completed').length,
          pending: data.filter(app => app.status === 'pending').length,
          acknowledged: data.filter(app => app.status === 'acknowledged').length,
          processing: data.filter(app => app.status === 'processing').length
        });
      }
    } catch (error) {
      console.error('Error fetching insurance statistics:', error);
    }
  };

  useEffect(() => {
    fetchStats();

    // Subscribe to changes in the applications table
    const channel = supabase
      .channel('insurance-stats')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'applications',
          filter: 'producttype=eq.Insurance'
        },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return stats;
}
