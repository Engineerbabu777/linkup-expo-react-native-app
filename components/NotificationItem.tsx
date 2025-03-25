import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import Avatar from "./Avatar";
import { getSupabaseFileUrl } from "@/services/image.service";
import moment from "moment";
import { router } from "expo-router";

type Props = {
  item: any;
};

const NotificationItem = ({ item }: Props) => {
  const handleClick = () => {
    let { postId, commentId } = JSON.parse(item.data);
    console.log({ item });
    router.push({
      pathname: "/(main)/postDetails",
      params: {
        postId,
        commentId
      }
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <Avatar uri={getSupabaseFileUrl(item?.sender?.image)} size={hp(5)} />

      <View style={styles.nameTitle}>
        <Text style={styles.text}>{item?.sender.name}</Text>
        <Text style={[styles.text, { color: theme.colors.textDark }]}>
          {item?.title}
        </Text>
      </View>

      <Text style={styles.text}>
        {moment(new Date(item?.created_at)).format("MMM d")}
      </Text>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: theme.colors.darkLight,
    padding: 15,
    borderRadius: theme.radius.xxl,
    borderCurve: "continuous"
  },
  nameTitle: {
    flex: 1,
    gap: 2
  },
  text: {
    fontSize: hp(1.6),
    fontWeight: "600",
    color: theme.colors.text
  }
});
