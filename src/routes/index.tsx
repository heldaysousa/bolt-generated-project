import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AuthGuard } from '../components/Layout/AuthGuard';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../lib/constants';

// Lazy load pages
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Appointments = React.lazy(() => import('../pages/Appointments'));
const Clients = React.lazy(() => import('../pages/Clients'));
const Financial = React.lazy(() => import('../pages/Financial'));
const Services = React.lazy(() => import('../pages/Services'));

export function AppRoutes() {
  useAuth(); // Hook para gerenciar autenticação

  return (
    <React.Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        
        <Route
          path={ROUTES.HOME}
          element={
            <AuthGuard>
              <Layout />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path={ROUTES.APPOINTMENTS} element={<Appointments />} />
          <Route path={ROUTES.CLIENTS} element={<Clients />} />
          <Route path={ROUTES.FINANCIAL} element={<Financial />} />
          <Route path={ROUTES.SERVICES} element={<Services />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}
