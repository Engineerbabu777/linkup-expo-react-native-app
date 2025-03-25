import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "./Avatar";
import moment from "moment";
import { Icon } from "@/assets/icons";
import { getSupabaseFileUrl } from "@/services/image.service";

type Props = {};

const CommentItem = ({ item, canDelete = false }) => {
  return (
    <View style={styles.container}>
      <Avatar uri={getSupabaseFileUrl(item?.user?.image)} />

      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View style={styles.nameContainer}>
            <Text style={styles.text}>{item?.user?.name}</Text>
            <Text style={[styles.text, { color: theme.colors.textLight }]}>
              <Text>.</Text>
              {moment(new Date(item?.created_at)).format("MMM d")}
            </Text>
          </View>
          {canDelete && (
            <TouchableOpacity>
              <Icon name={"delete"} size={20} color={theme.colors.rose} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={[styles.text, { fontWeight: "normal" }]}>
          {item?.text}
        </Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  text: {
    fontSize: hp(1.6),
    fontWeight: "600",
    color: theme.colors.textDark
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3
  },
  highlight: {
    borderWidth: 0.2,
    backgroundColor: "white",
    borderColor: theme.colors.dark,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  content: {
    backgroundColor: "rgba(0,0,0,0.06)",
    flex: 1,
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
    borderCurve: "continuous"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 7
  }
});
