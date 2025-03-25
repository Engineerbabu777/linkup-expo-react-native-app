import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { createComment, fetchPostDeatils } from "@/services/post.service";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import PostCard from "@/components/PostCard";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import Input from "@/components/Input";
import { Icon } from "@/assets/icons";

export default function index() {
  const { postId } = useLocalSearchParams();
  const inputRef = useRef(null);

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commentValue, setCommentValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getPostDetails();
  }, []);

  const getPostDetails = async () => {
    let res = await fetchPostDeatils(postId);
    if (res.success) {
      setLoading(false);
      setPost(res.data);
    }
  };

  const onNewComment = async () => {
    if (!inputRef.current) return null;

    let data = {
      userId: user?.id,
      postId: postId,
      text: commentValue
    };

    setIsLoading(true);

    let res = await createComment(data);
    if (res.success) {
      inputRef.current = "";
      setCommentValue("");
    } else {
      Alert.alert("comment", res.msg);
    }
  };

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Loading />
      </View>
    );
  }

  if (!post) {
    return (
      <>
        <View
          style={[
            styles.center,
            { justifyContent: "flex-start", marginTop: 100 }
          ]}
        >
          <Text style={styles.notFound}>No post found</Text>
        </View>
      </>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        <PostCard
          item={{ ...post, comments: [{ count: post?.comments?.length }] }}
          currentUser={user}
          hasShadow={false}
          showMoreIcon={false}
        />

        <View style={styles.inputContainer}>
          <Input
            placeholderTextColor={theme.colors.textLight}
            containerStyles={{
              flex: 1,
              height: hp(6.2),
              borderRadius: theme.radius.xl
            }}
            placeholder="Type comment..."
            ref={inputRef}
            value={commentValue}
            onChangeText={setCommentValue}
          />
          {isLoading ? (
            <>
              <Loading size="small" />
            </>
          ) : (
            <TouchableOpacity style={styles.sendIcon} onPress={onNewComment}>
              <Icon name={"send"} color={theme.colors.primaryDark} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: wp(7)
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  list: {
    paddingHorizontal: wp(4)
  },
  sendIcon: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.8,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
    height: hp(5.8),
    width: hp(5.8)
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  notFound: {
    fontSize: hp(2.5),
    color: theme.colors.text
  },
  loading: {
    height: hp(5.8),
    width: hp(5.8),
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 1.3 }]
  }
});
