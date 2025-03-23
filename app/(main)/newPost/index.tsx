import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "@/components/Avatar";
import { useAuth } from "@/context/AuthContext";
import RichTextEditor from "@/components/RichTextEditor";
import { Icon } from "@/assets/icons";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { getSupabaseFileUrl } from "@/services/image.service";
import { Video } from "expo-av";

export default function index() {
  const { user } = useAuth();

  const bodyRef = useRef("");
  const editorRef = useRef("");

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const onPick = async (isImage) => {
    let mediaConfig = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7
    };

    if (!isImage) {
      mediaConfig = {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true
      };
    }

    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };
  const onSubmit = async () => {};

  const isLocalFile = (file) => {
    if (!file) return null;

    if (typeof file === "object") return true;
    return false;
  };
  const getFileType = (file) => {
    if (!file) return null;

    if (isLocalFile(file)) {
      return file.type;
    }

    if (file.includes("postImage")) {
      return "image";
    } else {
      return "video";
    }
  };

  const getFileUri = (file) => {
    if (!file) return null;

    if (isLocalFile(file)) {
      return file.uri;
    }

    return getSupabaseFileUrl(file)?.uri;
  };

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

          {file && (
            <>
              <View style={styles.file}>
                {getFileType(file) === "video" ? (
                  <></>
                ) : (
                  <>
                    <Image
                      source={{ uri: getFileUri(file) }}
                      resizeMode="cover"
                      style={{ flex: 1 }}
                    />
                  </>
                )}

                <Pressable
                  style={styles.closeIcon}
                  onPress={() => setFile(null)}
                >
                  <Icon name="delete" color={"white"} size={20} />
                </Pressable>
              </View>
            </>
          )}

          <View style={styles.media}>
            <Text style={styles.addImageText}>Add to your post</Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity style={{}} onPress={() => onPick(true)}>
                <Icon name={"image"} size={30} color={theme.colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity style={{}} onPress={() => onPick(true)}>
                <Icon name={"video"} size={30} color={theme.colors.dark} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Button
          buttonStyle={{
            height: hp(6.2)
          }}
          title="Post"
          loading={loading}
          hasShadow={false}
          onPress={onSubmit}
        />
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
  file: {
    height: hp(30),
    width: "100%",
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    borderCurve: "continuous"
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderColor: theme.colors.gray
  },
  mediaIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
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
  },
  addImageText: {
    fontSize: hp(1.9),
    color: theme.colors.text,
    fontWeight: "600"
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,0,0,0.6)",
    padding: 7,
    borderRadius: 50
  }
});
