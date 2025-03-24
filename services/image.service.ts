// export const getUserImageSrc = imagePath => {

import { supabase } from "@/lib/supabase";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

// }

export const updloadFile = async (folderName, fileUri, isImage = true) => {
  try {
    let fileName = getFilePath(folderName, isImage);
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64
    });

    let imageData = decode(fileBase64);
    let { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, imageData, {
        contentType: isImage ? "image/*" : "video/*"
      });

    console.log({ data, error });

    if (error) {
      return {
        success: false,
        msg: error.message
      };
    }

    return {
      success: true,
      data: data.path
    };
  } catch (error) {
    return {
      success: false,
      msg: error.message
    };
  }
};

export const getFilePath = (foldername, isImage) => {
  return `/${foldername}/${new Date().getTime()}-${isImage ? ".png" : ".mp4"}`;
};

export const getSupabaseFileUrl = (filePath) => {
  return `https://vmfwyitewsntobjbdsqn.supabase.co/storage/v1/object/public/uploads/${filePath}`;
};

export const downloadFile = async (url) => {
  try {
    const { uri } = await FileSystem.downloadAsync(url, getLocalFilePath(url));
    console.log("....");
    return uri;
  } catch (error) {
    return null;
  }
};

export const getLocalFilePath = (filePath) => {
  let fileName = filePath.split("/").pop();
  return `${FileSystem.documentDirectory}${fileName}`;
};
