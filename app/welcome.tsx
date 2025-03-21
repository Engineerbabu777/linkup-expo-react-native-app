import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Button from "@/components/Button";
import { router } from "expo-router";

type Props = {};

const Welcome = (props: Props) => {
  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar barStyle={"dark-content"} />

      <View style={styles.container}>
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require("../assets 2/images/welcome.png")}
        />

        <View style={{ gap: 20 }}>
          <Text style={styles.title}>ConnectHub!</Text>
          <Text style={styles.punchLine}>
            Where connections thrive. Where moments come alive.
          </Text>
        </View>

        {/* footer! */}

        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={{
              marginHorizontal: wp(3)
            }}
            onPress={() => {}}
            hasShadow
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Pressable style={{}} onPress={() => router.push("/login")}>
              <Text
                style={[
                  styles.loginText,
                  {
                    color: theme.colors.primaryDark,
                    fontWeight: "700"
                  }
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: wp(4)
  },
  welcomeImage: {
    height: hp(30),
    width: wp(100),
    alignSelf: "center"
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: "800"
  },
  punchLine: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text
  },
  footer: {
    gap: 30,
    width: "100%"
  },
  bottomTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5
  },
  loginText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6)
  }
});
