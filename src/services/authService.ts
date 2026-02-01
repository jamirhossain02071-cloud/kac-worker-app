import { UserSession } from '../types';
import { supabase } from '../supabase';

export const validateLogin = async (id: string, pass: string): Promise<UserSession> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', id.toUpperCase())
      .eq('password', pass)
      .single();

    if (error || !data) {
      return { success: false, error: "Invalid ID or Password" };
    }

    return {
      success: true,
      role: data.role as 'USER' | 'COORDINATOR' | 'ADMIN',
      project: data.project_name || '',
      name: data.username
    };
  } catch (err) {
    return { success: false, error: "Database Connection Failed" };
  }
};
