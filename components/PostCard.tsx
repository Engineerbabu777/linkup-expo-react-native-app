import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import Avatar from "./Avatar";
import moment from "moment";
import { downloadFile, getSupabaseFileUrl } from "@/services/image.service";
import { Icon } from "@/assets/icons";
import RenderHtml from "react-native-render-html";
import { Image } from "expo-image";
import { Video } from "expo-av";
import { createPostLike, removePostLike } from "@/services/post.service";
import Loading from "./Loading";
import { router } from "expo-router";

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
export default function PostCard({
  item,
  currentUser,
  hasShadow = true,
  showMoreIcon = true,
  showDelete = false,
  onDelete = () => {},
  onEdit = () => {}
}) {
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
  const [likes, setLikes] = useState(item?.likesBy || []);
  const [loading, setLoading] = useState(false);

  const onLike = async () => {
    if (isLikedByMe) {
      let res = await removePostLike(item?.id, currentUser?.id);
      if (res.success) {
        setLikes([...likes.filter((l) => l.userId !== currentUser?.id)]);
      } else {
        Alert.alert("Post", "something went wrong2");
      }
    } else {
      let data = {
        userId: currentUser?.id,
        postId: item?.id
      };

      let res = await createPostLike(data);
      console.log({ res });
      if (!res.success) {
        Alert.alert("Post", "something went wrong");
      } else {
        setLikes([...likes, data]);
      }
    }
  };

  const isLikedByMe = likes.find(
    (likeData) => likeData?.userId === currentUser?.id
  );

  const onShare = async () => {
    console.log("abc");
    let content = { message: item?.body?.replace(/<\/?[^>]+(>|$)/g, "") };
    console.log({ item });
    if (item?.file) {
      setLoading(true);
      console.log("hello...");
      const fileURL = await getSupabaseFileUrl(item?.file);
      console.log({ fileURL });
      let url = await downloadFile(getSupabaseFileUrl(item?.file));
      content.url = url;
      setLoading(false);
    }
    Share.share(content);
  };

  const openDetails = () => {
    if (!showMoreIcon) return;
    router.push({
      pathname: "/postDetails",
      params: {
        postId: item?.id
      }
    });
  };

  const handlePostDelete = async () => {
    Alert.alert("Confirm", "Are you sure want to do this!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "delete",
        onPress: async () => await onDelete(item),
        style: "destructive"
      }
    ]);
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

        {showMoreIcon && (
          <TouchableOpacity onPress={() => {}}>
            <Icon
              name={"threeDotsHorizontal"}
              size={hp(3.4)}
              strokeWidth={3}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}

        {showDelete && currentUser?.id === item?.userId && (
          <>
            <View style={styles.actins}>
              <TouchableOpacity
                onPress={() => {
                  onEdit(item);
                }}
              >
                <Icon name={"edit"} size={hp(2.5)} color={theme.colors.text} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handlePostDelete}>
                <Icon
                  name={"delete"}
                  size={hp(2.5)}
                  color={theme.colors.rose}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
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
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={onLike}>
            <Icon
              name={"heart"}
              size={24}
              color={!isLikedByMe ? theme.colors.text : theme.colors.rose}
              fill={!isLikedByMe ? "white" : theme.colors.rose}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{likes?.length}</Text>
        </View>

        <View style={styles.footerButton}>
          <TouchableOpacity onPress={openDetails}>
            <Icon name={"comment"} size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.count}>{item?.comments[0]?.count || 0}</Text>
        </View>

        <View style={styles.footerButton}>
          {loading ? (
            <>
              <Loading size="small" />
            </>
          ) : (
            <>
              <TouchableOpacity onPress={onShare}>
                <Icon name={"share"} size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </>
          )}
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
