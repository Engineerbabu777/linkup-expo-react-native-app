import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchNotifications } from "@/services/notifications.service";
import { useAuth } from "@/context/AuthContext";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import ScreenWrapper from "@/components/ScreenWrapper";
import NotificationItem from "@/components/NotificationItem";
import Header from "@/components/Header";

export default function index() {
  const [notifications, setNotifications] = useState([]);

  const { user } = useAuth();
  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    let res = await fetchNotifications(user?.id);

    if (res.success) {
      setNotifications(res.data);
    }
  };
  return (
    <ScreenWrapper bg={"white"}>
      <View style={styles.container}>
        <Header title={"Notifications"} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
        >
          {notifications.map((item) => {
            return <NotificationItem item={item} />;
          })}
          {notifications.length == 0 && (
            <>
              <Text style={styles.noData}>No Notification Yet!</Text>
            </>
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: hp(4)
  },
  listStyle: {
    paddingVertical: 20,
    gap: 10
  },
  noData: {
    fontSize: hp(1.8),
    fontWeight: "600",
    color: theme.colors.text,
    textAlign: "center"
  }
});
