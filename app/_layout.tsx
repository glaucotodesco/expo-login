import { Stack } from "expo-router";
import { AuthProvider } from '../src/contexts/AuthContext';
import { ProtectedRoute } from '../src/components/ProtectedRoute';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="user" options={{ title: "Área do Usuário" }} />
          <Stack.Screen name="admin" options={{ title: "Administração" }} />
        </Stack>
      </ProtectedRoute>
    </AuthProvider>
  );
}
