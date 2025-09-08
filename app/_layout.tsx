import { Stack } from "expo-router";
import { AuthProvider } from '../src/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="user" options={{ title: "Área do Usuário" }} />
        <Stack.Screen name="admin" options={{ title: "Administração" }} />
      </Stack>
    </AuthProvider>
  );
}
