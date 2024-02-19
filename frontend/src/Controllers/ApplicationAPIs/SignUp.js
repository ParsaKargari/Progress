const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
  );


const tableName = 'Users';


async function insertUsername(username) {
  try {
    // Use the 'insert' method to add a new row with the specified username
    const { data, error } = await supabase
      .from(tableName)
      .insert([{ username }]);
    
    // Check for errors
    if (error) {
      console.error('Error inserting username:', error.message);
      return null;
    }
    
    // If successful, you can log the inserted data
    console.log('Inserted username:', data);
    
    // If you want to do something with the inserted data, you can return it
    return data;
  } catch (error) {
    console.error('Unexpected error:', error.message);
    return null;
  }
}


async function insertStatus(status) {
    try {
      // Use the 'insert' method to add a new row with the specified username
      const { data, error } = await supabase
        .from(tableName)
        .insert([{ username }]);
      
      // Check for errors
      if (error) {
        console.error('Error inserting username:', error.message);
        return null;
      }
      
      // If successful, you can log the inserted data
      console.log('Inserted username:', data);
      
      // If you want to do something with the inserted data, you can return it
      return data;
    } catch (error) {
      console.error('Unexpected error:', error.message);
      return null;
    }
  }

