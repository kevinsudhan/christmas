import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { supabase } from '../supabaseClient';

export function useProtectedAction() {
  const navigate = useNavigate();

  const handleProtectedAction = async (action: () => void) => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (!session) {
        notification.warning({
          message: 'Authentication Required',
          description: 'Please log in or create an account to access this feature.',
          duration: 4,
          key: 'auth-required'
        });
        
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        navigate('/login');
        return;
      }

      // If authenticated, execute the action
      action();
    } catch (error) {
      console.error('Auth check error:', error);
      notification.error({
        message: 'Error',
        description: 'Something went wrong. Please try again.',
        duration: 4
      });
    }
  };

  return handleProtectedAction;
}
