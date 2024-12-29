import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Application = Database['public']['Tables']['applications']['Insert'];

export async function submitApplication(application: Application) {
  try {
    console.log('Submitting application:', application); // Debug log

    const { data, error } = await supabase
      .from('applications')
      .insert([application])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error); // Debug log
      throw new Error(error.message);
    }

    console.log('Submission successful:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Submission error:', error); // Debug log
    throw error;
  }
}

export async function getApplications() {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error); // Debug log
      throw new Error(error.message);
    }

    console.log('Retrieved applications:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error retrieving applications:', error); // Debug log
    throw error;
  }
}

export async function updateApplicationStatus(
  id: string,
  status: 'pending' | 'contacted' | 'approved' | 'rejected'
) {
  try {
    console.log(`Updating application status for id ${id} to ${status}`); // Debug log

    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error); // Debug log
      throw new Error(error.message);
    }

    console.log('Update successful:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error updating application status:', error); // Debug log
    throw error;
  }
}
