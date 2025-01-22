import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface CustomerStats {
  total: number;
  new: number;
}

export const useCustomerStats = () => {
  const [stats, setStats] = useState<CustomerStats>({
    total: 0,
    new: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get all customers
        const { data: customers, error } = await supabase
          .from('applications')
          .select('customer_id, created_at');

        if (error) throw error;

        // Get unique customer IDs
        const uniqueCustomers = [...new Set(customers?.map(c => c.customer_id))];
        
        // Get new customers (created in the last 24 hours)
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        
        const newCustomers = customers?.filter(customer => {
          const createdAt = new Date(customer.created_at);
          return createdAt >= oneDayAgo;
        });

        const uniqueNewCustomers = [...new Set(newCustomers?.map(c => c.customer_id))];

        setStats({
          total: uniqueCustomers.length,
          new: uniqueNewCustomers.length,
        });
      } catch (error) {
        console.error('Error fetching customer stats:', error);
      }
    };

    fetchStats();
  }, []);

  return stats;
};
