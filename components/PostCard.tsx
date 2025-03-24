import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import Avatar from "./Avatar";
import moment from "moment";
import { getSupabaseFileUrl } from "@/services/image.service";
import { Icon } from "@/assets/icons";
import RenderHtml from "react-native-render-html";
import { Image } from "expo-image";
import { Video } from "expo-av";
import { createPostLike } from "@/services/post.service";

const textStyle = {
  color: theme.colors.dark,
  fontSize: hp(1.75)
};
const tagStyles = {
  div: textStyle,
  p: textStyle,
  ol: textStyle,
  h1: {
    color: theme.colors.dark
  },
  h4: {
    color: theme.colors.dark
  }
};
export default function PostCard({ item, currentUser, hasShadow = true }) {
  const shadowStyles = {
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1
  };
  let liked = false;
  let likes = [];

  const onLike = async () => {
    let data = {
      userid: currentUser?.id,
      postId: item?.id
    };

    let res = await createPostLike(data);
    console.log({ res });
    if (!res.success) {
      Alert.alert("Post", "something went wrong");
    }
  };

  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar
            size={hp(4.5)}
            uri={getSupabaseFileUrl(item?.user?.image)}
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text style={styles.username}>{item?.user?.name}</Text>
            <Text style={styles.postTime}>
              {moment(item?.created_at).format("MMM D")}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => {}}>
          <Icon
            name={"threeDotsHorizontal"}
            size={hp(3.4)}
            strokeWidth={3}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.postBody}>
          <Text>
            {item?.body && (
              <RenderHtml
                contentWidth={wp(100)}
                source={{ html: item?.body }}
                tagsStyles={tagStyles}
              />
            )}
          </Text>
        </View>

        {item?.file && item?.file?.includes("postImages") && (
          <>
            <Image
              source={{ uri: getSupabaseFileUrl(item?.file) }}
              transition={100}
              style={styles.postMedia}
              contentFit="cover"
            />
          </>
        )}

        {item?.file && item?.file?.includes("postVideos") && (
          <>
            <Video
              source={{ uri: getSupabaseFileUrl(item?.file) }}
              style={[styles.postMedia, { height: hp(30) }]}
              resizeMode="cover"
              useNativeControls
              isLooping
            />
          </>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerButton} onPress={onLike}>
          <TouchableOpacity>
            <Icon
              name={"heart"}
              size={24}
              color={!liked ? theme.colors.text : theme.colors.rose}
              fill={!liked ? "white" : theme.colors.rose}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{likes?.length}</Text>
        </View>

        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Icon name={"comment"} size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.count}>{"0"}</Text>
        </View>

        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Icon name={"share"} size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  count: {
    color: theme.colors.text,
    fontSize: hp(1.8)
  },
  actins: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18
  },
  footerButton: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  postBody: {
    marginLeft: 5
  },
  postMedia: {
    height: hp(40),
    width: "100%",
    borderRadius: theme.radius.xl,
    borderCurve: "continuous"
  },
  content: {
    gap: 10
  },
  postTime: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    fontWeight: "500"
  },
  username: {
    fontSize: hp(1.7),
    color: theme.colors.textDark,
    fontWeight: "500"
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: theme.radius.xxl * 1.1,
    borderCurve: "continuous",
    padding: 10,
    paddingVertical: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    shadowColor: "#000"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
