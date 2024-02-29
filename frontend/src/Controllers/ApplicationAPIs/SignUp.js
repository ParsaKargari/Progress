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

export async function addStatus(status, user_id) {
    try {
        const result = await supabase
            .from('Users')
            .update([{ Status: status }])
            .eq('UserID', user_id);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function addEmail(email, user_id) {
    try {
        const result = await supabase
            .from('Users')
            .update([{ UserEmail: email }])
            .eq('UserID', user_id);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
