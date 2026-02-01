
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
import { supabase } from '../supabase'; // নিশ্চিত করুন এই পাথটি আপনার প্রোজেক্টে সঠিক আছে

export const validateLogin = async (id: string, pass: string): Promise<UserSession> => {
  try {
    // সুপাবেসের 'users' টেবিল থেকে ইউজার এবং পাসওয়ার্ড চেক করা
    const { data, error } = await supabase
      .from('users') // আপনার ডাটাবেস টেবিলের নাম
      .select('*')
      .eq('username', id.toUpperCase()) // ইউজার আইডি সব সময় বড় হাতের অক্ষরে চেক করবে
      .eq('password', pass) // আপনার দেওয়া পাসওয়ার্ড মিলিয়ে দেখবে
      .single();

    if (error || !data) {
      // যদি তথ্য না মেলে তবে এরর মেসেজ দেবে
      return { success: false, error: "Invalid ID or Password" };
    }

    // লগইন সফল হলে ডাটাবেস থেকে পাওয়া রোল এবং প্রোজেক্টের নাম রিটার্ন করবে
    return { 
      success: true, 
      role: data.role as 'USER' | 'COORDINATOR' | 'ADMIN', 
      project: data.project_name || '', 
      name: data.username 
    };
    
  } catch (err) {
    return { success: false, error: "Connection to Database Failed" };
  }
};
