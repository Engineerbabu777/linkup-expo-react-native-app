import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { Icon } from "@/assets/icons";
import { router } from "expo-router";

const home = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header! */}
        <View style={styles.header}>
          <Text style={styles.title}>ConnectHub</Text>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push("notifications")}>
              <Text>
                <Icon
                  name={"heart"}
                  size={hp(3.2)}
                  strokeWidth={2}
                  color={theme.colors.text}
                />
              </Text>
            </Pressable>
            <Pressable onPress={() => router.push("newPost")}>
              <Text>
                <Icon
                  name={"plus"}
                  size={hp(3.2)}
                  strokeWidth={2}
                  color={theme.colors.text}
                />
              </Text>
            </Pressable>
            <Pressable onPress={() => router.push("profile")}>
              <Text>
                <Icon
                  name={"user"}
                  size={hp(3.2)}
                  strokeWidth={2}
                  color={theme.colors.text}
                />
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4)
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: "700"
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
    borderWidth: 3,
    borderColor: theme.colors.gray
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: theme.colors.text
  },
  pill: {
    position: "absolute",
    right: -10,
    top: -4
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4)
  }
});
