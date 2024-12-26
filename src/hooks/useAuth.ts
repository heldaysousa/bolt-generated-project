import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../lib/constants';

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session && window.location.pathname !== ROUTES.REGISTER) {
        navigate(ROUTES.LOGIN);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, setUser, setLoading]);
}
