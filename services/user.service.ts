import { supabase } from "@/lib/supabase";

export const getUserData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
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
    console.log(`Error: ${error}`);
    return {
      success: false,
      msg: error.message
    };
  }
};

export const updateUser = async (userId: string, data: any) => {
  try {
    console.log({userId})
    const { data: Data, error } = await supabase
      .from("users")
      .update(data)
      .eq("id", userId);

    if (error) {
      console.log({ error });
      return {
        success: false,
        msg: error.message
      };
    }

    return { success: true, Data };
  } catch (error) {
    console.log(`Error: ${error}`);
    return {
      success: false,
      msg: error.message
    };
  }
};
