import supabaseClient from "@/utils/supabaseClient";

export async function sbInsert(table, insertData) {
    const { data, error } = await supabaseClient
      .from(table)
      .insert(insertData)
      .select();
  
    return { error, data };
  }