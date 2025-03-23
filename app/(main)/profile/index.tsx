import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { hp, wp } from "@/helpers/common";
import { Icon } from "@/assets/icons";
import { theme } from "@/constants/theme";
import { supabase } from "@/lib/supabase";

export default function index() {
  const { user, setAuth } = useAuth();

  return (
    <ScreenWrapper bg={"white"}>
      <UserHeader user={user} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    position: "absolute",
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: "#fee2e2"
  },
  container: {
    flex: 1
  },
  headerContainer: {
    marginHorizontal: wp(4),
    marginBottom: 20
  },
  headerShape: {
    width: wp(100),
    height: hp(20)
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: "center"
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: theme.colors.text
  },
  listStyle: {
    paddingHorizontal: wp(4),
    paddingBottom: 30
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: theme.colors.textLight
  },
  info: {
    alignItems: "center",
    gap: 10
  }
});

const UserHeader = ({ user }) => {
  const handleLogout = () => {
    Alert.alert("Confirm", "Are you sure want to logout!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "Logout",
        onPress: async () => await supabase.auth.signOut(),
        style: "destructive"
      }
    ]);
  };
  return (
    <View
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: wp(4) }}
    >
      <View>
        <Header title={"Profile"} showBackButton />

        <TouchableOpacity
          onPress={() => {
            handleLogout();
          }}
          style={styles.logoutButton}
        >
          <Icon name={"logout"} color={theme.colors.rose} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
