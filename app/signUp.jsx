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


const SignUp = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Sign Up", "Please fill in all required fields.");
      return;
    }

    // Trim input values
    const name = nameRef.current.trim();
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      if (error) {
        Alert.alert("Sign Up Failed", error.message);
        return;
      }

      Alert.alert("Sign Up Successful", "Your account has been created.");
    } catch (err) {
      Alert.alert(
        "Sign Up Error",
        "An unexpected error occurred. Please try again."
      );
      console.error("Sign Up Error:", err);
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
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* form! */}
        <View style={styles.form}>
          <Text
            style={{
              fontSize: hp(1.5),
              color: theme.colors.text
            }}
          >
            Please fill details to create an account
          </Text>

          <Input
            icon={<Icon name={"user"} size={26} strokeWidth={1.6} />}
            placeholder={"Enter your name"}
            onChangeText={(value) => {
              nameRef.current = value;
            }}
          />
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

          <Button title="Sign Up" loading={loading} onPress={handleLogin} />
        </View>

        {/* footer! */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>

          <Pressable style={{}} onPress={() => router.push("/login")}>
            <Text
              style={[
                styles.footerText,
                { color: theme.colors.primaryDark, fontWeight: "700" }
              ]}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

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
