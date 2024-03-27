import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to update user status
  const updateUserStatus = async (userId, status) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/friends/updateStatus/${userId}/${status}`);
      console.log(`User status updated to ${status}`);
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error retrieving session:', error.message);
      } else {
        const user = data.session?.user || null;
        setUser(user);
        if (user) {
          // Update user status to online
          updateUserStatus(user.id, 'Online');
        }
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
        // Update user status to online
        updateUserStatus(session.user.id, 'Online');
      } else if (event === 'SIGNED_OUT') {
        if (user) {
          // Update user status to offline before clearing the user from state
          updateUserStatus(user.id, 'Offline');
        }
        setUser(null);
      }
    });

    return () => {
      if (authListener?.subscription) authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    signIn: async (email, password) => {
      const { error, user } = await supabase.auth.signIn({ email, password });
      if (!error && user) {
        // Update user status to online
        updateUserStatus(user.id, 'Online');
      }
    },
    signOut: async () => {
      if (user) {
        // Update user status to offline before signing out
        await updateUserStatus(user.id, 'Offline');
      }
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error during sign out:', error.message);
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
