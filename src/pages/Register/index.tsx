import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ROUTES } from '../../lib/constants';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    businessName: ''
  });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Criar usuário
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            business_name: formData.businessName
          }
        }
      });

      if (signUpError) throw signUpError;

      // 2. Criar perfil
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: authData.user.id,
            full_name: formData.fullName,
            business_name: formData.businessName
          }]);

        if (profileError) throw profileError;
      }

      navigate(ROUTES.LOGIN, { 
        state: { message: 'Conta criada com sucesso! Faça login para continuar.' }
      });
    } catch (err) {
      console.error('Registration error:', err);
      setError('Erro ao criar conta. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#000000] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-bold text-center text-rose-600 dark:text-[#C0C0C0]">CEO Express</h1>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Crie sua conta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-[#1C1C1C]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nome completo"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />

            <Input
              label="Nome do negócio"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              required
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Senha"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
            />

            {error && (
              <p className="text-sm text-red-600 dark:text-[#8B0000]">{error}</p>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
