
// import { UserSession } from '../types';

// export const validateLogin = async (id: string, pass: string): Promise<UserSession> => {
//   // Hardcoded preview credentials
//   if (id.toUpperCase() === 'ADMIN' && pass === '123') {
//     return { success: true, role: 'USER', project: 'DAHOD SITE', name: 'ADMIN USER' };
//   }
  
//   if (id.toUpperCase() === 'COORD' && pass === '123') {
//     return { success: true, role: 'COORDINATOR', name: 'COORD' };
//   }

//   // Simulate server delay
//   await new Promise(resolve => setTimeout(resolve, 800));
  
//   return { success: false, error: "Invalid ID or Password" };
// };
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
