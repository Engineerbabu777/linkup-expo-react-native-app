import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  Pressable,
  Alert
} from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import BackButton from "@/components/BackButton";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Input from "@/components/Input";
import { Icon } from "@/assets/icons";
import Button from "@/components/Button";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";


const login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "please fill all details");
      return;
    }

    // Trim input values
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        Alert.alert("Login Failed", error.message);
        return;
      }

      Alert.alert("Login Successful");
      router.push("/(main)/home");
    } catch (err) {
      Alert.alert(
        "Login Error",
        "An unexpected error occurred. Please try again."
      );
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar barStyle={"dark-content"} />

      <View style={styles.container}>
        <BackButton />

        {/* welcome */}
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* form! */}
        <View style={styles.form}>
          <Text
            style={{
              fontSize: hp(1.5),
              color: theme.colors.text
            }}
          >
            Please login to continue
          </Text>

          <Input
            icon={<Icon name={"mail"} size={26} strokeWidth={1.6} />}
            placeholder={"Enter your email"}
            onChangeText={(value) => {
              emailRef.current = value;
            }}
          />
          <Input
            icon={<Icon name={"lock"} size={26} strokeWidth={1.6} />}
            placeholder={"Enter your password"}
            onChangeText={(value) => {
              passwordRef.current = value;
            }}
            secureTextEntry
          />
          <Text style={styles.forgotPassword}>Forgot Password?</Text>

          <Button title="Login" loading={loading} onPress={handleLogin} />
        </View>

        {/* footer! */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>

          <Pressable style={{}} onPress={() => router.push("/signUp")}>
            <Text
              style={[
                styles.footerText,
                { color: theme.colors.primaryDark, fontWeight: "700" }
              ]}
            >
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5)
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: theme.colors.text
  },
  form: {
    gap: 25
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "700",
    color: theme.colors.text
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6)
  }
});
