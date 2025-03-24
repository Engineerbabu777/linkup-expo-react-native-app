import { supabase } from "@/lib/supabase";
import { updloadFile } from "./image.service";

export const createOrUpdatePost = async (post) => {
  try {
    // upload image!

    if (post?.file && typeof post.file === "object") {
      let isImage = post?.file?.type == "image";
      let folderName = isImage ? "postImages" : "postVideos";
      let fileResult = await updloadFile(folderName, post?.file?.uri, isImage);

      if (fileResult.success) post.file = fileResult.data;
      else {
        return fileResult;
      }
    }

    const { data, error } = await supabase
      .from("posts")
      .upsert(post)
      .select()
      .single();

    if (error) {
      console.log({ error });

      return {
        success: false,
        msg: error.message
      };
    }

    return { success: true, data };
  } catch (error) {
    console.log({ error });

    return {
      success: false,
      msg: "Could not create your post!"
    };
  }
};
