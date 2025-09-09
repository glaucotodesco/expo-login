import { router, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const currentRoute = segments[0];
    const isProtectedRoute = currentRoute === 'user' || currentRoute === 'admin';
    const isIndexRoute = !currentRoute || currentRoute === '_sitemap';

    if (!user && isProtectedRoute) {
      // Usuário não logado tentando acessar rota protegida
      router.replace('/');
    } else if (user && currentRoute === 'admin' && user.role !== 'admin') {
      // Usuário sem permissão de admin tentando acessar área admin
      router.replace('/user');
    } else if (user && isIndexRoute) {
      // Usuário logado na rota inicial, redirecionar para área apropriada
      if (user.role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/user');
      }
    }
  }, [user, isLoading, segments]);

  return <>{children}</>;
}