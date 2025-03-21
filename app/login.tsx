import { View, Text, StatusBar, StyleSheet, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import BackButton from "@/components/BackButton";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Input from "@/components/Input";
import { Icon } from "@/assets/icons";

type Props = {};

const login = (props: Props) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
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
            onChangeText={() => {}}
          />
          <Input
            icon={<Icon name={"lock"} size={26} strokeWidth={1.6} />}
            placeholder={"Enter your password"}
            onChangeText={() => {}}
            secureTextEntry
          />
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
  }
});
