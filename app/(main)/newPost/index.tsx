import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "@/components/Avatar";
import { useAuth } from "@/context/AuthContext";
import RichTextEditor from "@/components/RichTextEditor";

export default function index() {
  const { user } = useAuth();

  const bodyRef = useRef("");
  const editorRef = useRef("");

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  return (
    <ScreenWrapper bg={"white"}>
      <View style={styles.container}>
        <Header title={"Create Post"} />

        <ScrollView contentContainerStyle={{ gap: 20 }}>
          {/* avatar! */}
          <View style={styles.header}>
            <Avatar
              uri={user?.image}
              size={hp(6.5)}
              rounded={theme.radius.xl}
            />
            <View style={{ gap: 2 }}>
              <Text style={styles.username}>{user?.name}</Text>
              <Text style={styles.publicText}>Public</Text>
            </View>
          </View>

          <View style={styles.textEditor}>
            <RichTextEditor
              editorRef={editorRef}
              onChange={(body) => (bodyRef.current = body)}
            />
          </View>
        </ScrollView>
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
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: "600",
    color: theme.colors.text
  },
  avatar: {
    width: wp(6.5),
    height: wp(6.5),
    borderRadius: theme.radius.xl,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderCurve: "continuous"
  },
  textEditor: {},
  media: {
    flexDirection: "row"
  },
  header: {
    gap: 12,
    alignItems: "center",
    flexDirection: "row"
  },
  publicText: {
    fontSize: hp(1.5),
    fontWeight: "500",
    color: theme.colors.textLight
  }
});
