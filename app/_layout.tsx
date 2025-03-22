import { AuthProvider, useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getUserData } from "@/services/user.service";
import { useRouter, Stack } from "expo-router";
import { useEffect } from "react";

export default function Provider() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

function MainLayout() {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log({ session, _event });
      if (_event === "INITIAL_SESSION") {
        updateUserData(session?.user);
        setAuth(session?.user);
        router.push("/home");
      }
    });
  }, []);

  const updateUserData = async (user: any) => {
    let res = await getUserData(user?.id);
    if (res.success) setUserData(res.data);
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
}
