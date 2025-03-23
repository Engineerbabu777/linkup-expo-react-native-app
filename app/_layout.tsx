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
      if (_event === "INITIAL_SESSION" && session) {
        updateUserData(session?.user);
        setAuth(session?.user);
        router.push("/home");
      }
      if (_event === "SIGNED_OUT") {
        updateUserData(null);
        setAuth(null);
        router.push("/welcome");
      }

      if (_event === "INITIAL_SESSION" && !session) {
        router.push("/welcome");
      }
    });
  }, []);

  const updateUserData = async (user: any) => {
    console.log({ user: user?.id });
    let res = await getUserData(user?.id);
    console.log({ res });
    if (res.success) setUserData({ ...res.data, email: user?.email });
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
}
