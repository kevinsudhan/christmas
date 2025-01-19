import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Application = Database['public']['Tables']['applications']['Insert'];
type CustomerInsert = Database['public']['Tables']['customers']['Insert'];

async function getOrCreateCustomer(authUserId: string, email: string, fullName: string, phoneNumber: string) {
  try {
    // First, try to find existing customer by auth ID or email
    const { data: existingCustomer, error: selectError } = await supabase
      .from('customers')
      .select()
      .or(`customer_id.eq.${authUserId},email.eq.${email}`)
      .single();

    if (selectError && !selectError.message.includes('No rows found')) {
      console.error('Error checking for existing customer:', selectError);
      throw new Error(`Error checking for existing customer: ${selectError.message}`);
    }

    if (existingCustomer) {
      // If customer exists but with different auth ID, update the record
      if (existingCustomer.customer_id !== authUserId) {
        const { data: updatedCustomer, error: updateError } = await supabase
          .from('customers')
          .update({ customer_id: authUserId })
          .eq('id', existingCustomer.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating customer:', updateError);
          throw new Error(`Failed to update customer record: ${updateError.message}`);
        }

        return updatedCustomer;
      }
      return existingCustomer;
    }

    // If no customer exists, create one
    const newCustomerData: CustomerInsert = {
      customer_id: authUserId,
      full_name: fullName,
      email: email,
      phone_number: phoneNumber
    };

    const { data: newCustomer, error: createError } = await supabase
      .from('customers')
      .insert([newCustomerData])
      .select()
      .single();

    if (createError) {
      console.error('Error creating customer:', createError);
      throw new Error(`Failed to create customer record: ${createError.message}`);
    }

    if (!newCustomer) {
      throw new Error('Failed to create customer record: No data returned');
    }

    return newCustomer;
  } catch (error) {
    console.error('Error in getOrCreateCustomer:', error);
    throw error;
  }
}

export async function submitApplication(application: Application) {
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User must be logged in to submit an application');
    }

    // Ensure customer record exists
    const fullName = `${application.firstname} ${application.lastname}`;
    const customer = await getOrCreateCustomer(
      user.id,
      application.email,
      fullName,
      application.mobilenumber
    );

    // Add the customer_id to the application
    const applicationWithCustomerId = {
      ...application,
      customer_id: customer.customer_id
    };

    console.log('Submitting application:', applicationWithCustomerId);

    const { data, error } = await supabase
      .from('applications')
      .insert([applicationWithCustomerId])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    console.log('Submission successful:', data);
    return data;
  } catch (error) {
    console.error('Submission error:', error);
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
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    console.log('Retrieved applications:', data);
    return data;
  } catch (error) {
    console.error('Error retrieving applications:', error);
    throw error;
  }
}

export async function updateApplicationStatus(
  id: string,
  status: 'pending' | 'contacted' | 'approved' | 'rejected'
) {
  try {
    console.log(`Updating application status for id ${id} to ${status}`);

    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    console.log('Update successful:', data);
    return data;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
}
