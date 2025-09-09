import { Stack } from "expo-router";
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';

function AppLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // ou um componente de loading
  }

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn && !isAdmin}>
        <Stack.Screen name="user" options={{ title: "Área do Usuário" }} />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn && isAdmin}>
        <Stack.Screen name="admin" options={{ title: "Administração" }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
