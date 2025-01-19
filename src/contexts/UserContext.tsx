import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface UserContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<string>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      // Step 1: Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('User creation failed');

      // Step 2: Generate a customer ID
      const { data: customerIdData, error: customerIdError } = await supabase
        .rpc('generate_customer_id');

      if (customerIdError) {
        console.error('Error generating customer ID:', customerIdError);
        throw customerIdError;
      }

      // Step 3: Create customer record
      const { error: insertError } = await supabase
        .from('customers')
        .insert({
          id: authData.user.id,
          customer_id: customerIdData,
          full_name: fullName,
          email: email,
          phone: phone,
        });

      if (insertError) {
        console.error('Error creating customer record:', insertError);
        // Attempt to delete the auth user if customer creation fails
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw insertError;
      }

      // Step 4: Verify customer record was created
      const { data: verifyData, error: verifyError } = await supabase
        .from('customers')
        .select('customer_id')
        .eq('id', authData.user.id)
        .single();

      if (verifyError || !verifyData) {
        console.error('Error verifying customer record:', verifyError);
        throw new Error('Failed to verify customer record creation');
      }

      console.log('Successfully created customer with ID:', verifyData.customer_id);
      return verifyData.customer_id;

    } catch (error: any) {
      console.error('Signup process error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
