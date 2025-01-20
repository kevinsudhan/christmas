import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface UserContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<string>;
  signOut: () => Promise<void>;
  isEmployee: boolean;
  setIsEmployee: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    // Check active session and employee status
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      // Check if employee session exists
      const employeeId = localStorage.getItem('employeeId');
      setIsEmployee(!!employeeId);
      
      setLoading(false);
    };
    
    checkSession();

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

  const signUp = async (email: string, password: string, fullName: string, phone: string): Promise<string> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName,
            phone: phone
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        throw error;
      }

      if (!data.user) {
        throw new Error('No user data returned');
      }

      // Wait briefly for the trigger
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get customer ID
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('customer_id')
        .eq('id', data.user.id)
        .single();

      if (customerError) {
        console.error('Customer fetch error:', customerError);
        throw new Error('Could not retrieve customer information');
      }

      if (!customer?.customer_id) {
        throw new Error('Customer ID not generated');
      }

      return customer.customer_id;
    } catch (error: any) {
      console.error('Signup process error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('employeeId'); // Clear employee session
    setIsEmployee(false);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signUp, 
      signOut,
      isEmployee,
      setIsEmployee 
    }}>
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
