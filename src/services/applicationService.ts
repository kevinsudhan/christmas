import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Application = Database['public']['Tables']['applications']['Insert'];

async function getCurrentCustomerId(): Promise<string> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
    
  if (userError || !user) {
    throw new Error('User must be logged in to submit an application');
  }

  const { data: customerData, error: customerError } = await supabase
    .from('customers')
    .select('customer_id')
    .eq('email', user.email)
    .single();

  if (customerError || !customerData) {
    throw new Error('Customer profile not found');
  }

  return customerData.customer_id;
}

export async function submitApplication(application: Application) {
  try {
    const customer_id = await getCurrentCustomerId();

    // Add the customer_id to the application
    const applicationWithCustomerId = {
      ...application,
      customer_id
    };

    console.log('Submitting application:', applicationWithCustomerId);

    const { data, error } = await supabase
      .from('applications')
      .insert([applicationWithCustomerId])
      .select()
      .single();

    if (error) {
      console.error('Error submitting application:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Submission error:', error);
    throw error;
  }
}

export async function getApplications() {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateApplicationStatus(
  id: string,
  status: 'pending' | 'contacted' | 'approved' | 'rejected'
) {
  const { error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
}
