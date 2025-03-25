import { supabase } from "@/lib/supabase";

export const createNotifications = async (notification: any) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert(notification)
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
      msg: "Could not notify the user"
    };
  }
};

export const fetchNotifications = async (recieverId) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select(`*, sender:senderId(id, name, image)`)
      .eq("receiverId", recieverId)
      .order("created_at", { ascending: false })
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
      msg: "Could not fetch your notifications!"
    };
  }
};
