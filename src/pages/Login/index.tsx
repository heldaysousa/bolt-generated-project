import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ROUTES } from '../../lib/constants';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, loading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Mostrar mensagem de sucesso após registro
    const state = location.state as { message?: string };
    if (state?.message) {
      setMessage(state.message);
    }
  }, [location]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {
      await signIn(email, password);
      navigate(ROUTES.HOME);
    } catch (err) {
      console.error('Login error:', err);
      setError('Email ou senha inválidos');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#000000] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/logo.png" alt="CEO Express Logo" className="h-16 mb-4" />
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Entre na sua conta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1C1C1C] py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-[#1C1C1C]">
          {message && (
            <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md dark:bg-green-900 dark:text-green-300">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              required
            />

            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            <p className="text-center text-sm text-gray-600 dark:text-[#C0C0C0]">
              Não tem uma conta?{' '}
              <Link to={ROUTES.REGISTER} className="text-rose-600 hover:text-rose-500 dark:text-[#4B0082] dark:hover:text-[#6A1B9A]">
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
