import { View, Text, StatusBar } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import BackButton from "@/components/BackButton";

type Props = {};

const login = (props: Props) => {
  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar barStyle={"dark-content"} />

      <View>
        <BackButton />
      </View>
    </ScreenWrapper>
  );
};

export default login;
