import { hp, wp } from "@/helpers/common";

import { Icon } from "@/assets/icons";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { router } from "expo-router";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Avatar from "../../components/Avatar";

const home = () => {
  const { user } = useAuth();
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
                <Avatar
                  uri={
                    user?.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s"
                  }
                  size={hp(4.3)}
                  rounded={theme.radius.sm}
                  style={{ borderWidth: 1 }}
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
