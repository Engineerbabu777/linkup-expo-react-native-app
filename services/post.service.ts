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

export const fetchPosts = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `*, user:users(id,name,image), likesCount:postLikes(count), likesBy:postLikes(*), comments(count)`
      )
      .order("created_at", { ascending: false })
      .limit(limit);

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
      msg: "Could not fetch your post!"
    };
  }
};

export const fetchPostDeatils = async (postId) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `*, user:users(id,name,image), likesCount:postLikes(count), likesBy:postLikes(*), comments(*, user:users(name,image,id))`
      )
      .eq("id", postId)
      .order("created_at", { ascending: false, foreignTable: "comments" })
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
      msg: "Could not fetch your post!"
    };
  }
};

export const createPostLike = async (postLike: any) => {
  try {
    const { data, error } = await supabase
      .from("postLikes")
      .insert(postLike)
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
      msg: "Could not like the post"
    };
  }
};

export const createComment = async (comment: any) => {
  try {
    console.log({ comment });
    const { data, error } = await supabase
      .from("comments")
      .insert(comment)
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
      msg: "Could not create a comment to post!"
    };
  }
};

export const removePostLike = async (postId: any, userId: any) => {
  try {
    const { data, error } = await supabase
      .from("postLikes")
      .delete()
      .eq("userId", userId)
      .eq("postId", postId);

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
      msg: "Could not remove like from post"
    };
  }
};
