import { AuthProvider, useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getSupabaseFileUrl } from "@/services/image.service";
import { getUserData } from "@/services/user.service";
import { useRouter, Stack } from "expo-router";
import { useEffect } from "react";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);
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
    if (res.success) {
      if (res.data?.image) {
        setUserData({
          ...res.data,
          image: getSupabaseFileUrl(res.data?.image),
          email: user?.email
        });
      } else {
        setUserData({ ...res.data, email: user?.email });
      }
    }
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="(main)/postDetails/index"
        options={{
          presentation: "modal"
        }}
      />
    </Stack>
  );
}
