import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";

export default function index() {
  return (
    <ScreenWrapper bg={"white"}>
      <View style={styles.container}>
        <Header title={"Create Post"} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: theme.colors.text,
    textAlign: "center"
  }
});
