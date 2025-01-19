import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { notification } from 'antd';

export function useAuthGuard(redirectPath: string = '/login') {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState(null);

  const handleUnauthenticated = () => {
    if (window.location.pathname !== redirectPath) {
      notification.warning({
        message: 'Authentication Required',
        description: 'Please log in or create an account to access this feature.',
        duration: 4,
        key: 'auth-required' // This ensures only one notification is shown
      });
      
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      navigate(redirectPath);
    }
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (!session) {
          handleUnauthenticated();
          return;
        }

        setUser(session.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check error:', error);
        handleUnauthenticated();
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        handleUnauthenticated();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, redirectPath]);

  return { isAuthenticated, user };
}
