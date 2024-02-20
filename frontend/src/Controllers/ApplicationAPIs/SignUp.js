import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
  );



export async function addUsername(userName, user_id) {
    try {
        const result = await supabase
            .from('Users')
            .update([{ Username: userName }])
            .eq('UserID', user_id);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}





//  async function insertUsername(username) {
    //   try {
    //     // Use the 'insert' method to add a new row with the specified username
    //     const { data, error } = await supabase
    //       .from(tableName)
    //       .insert([{ username }]);
        
    //     // Check for errors
    //     if (error) {
    //       console.error('Error inserting username:', error.message);
    //       return null;
    //     }
        
    //     // If successful, you can log the inserted data
    //     console.log('Inserted username:', data);
        
    //     // If you want to do something with the inserted data, you can return it
    //     return data;
    //   } catch (error) {
    //     console.error('Unexpected error:', error.message);
    //     return null;
    //   }
    // }