import { View, Text, StatusBar } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  bg?: any;
};

const ScreenWrapper = ({ children, bg }: Props) => {
  const { top } = useSafeAreaInsets();

  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View
      style={{
        flex: 1,
        paddingTop,
        backgroundColor: bg
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      {children}
    </View>
  );
};

export default ScreenWrapper;
