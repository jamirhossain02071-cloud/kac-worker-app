
import { UserSession } from '../types';

export const validateLogin = async (id: string, pass: string): Promise<UserSession> => {
  // Hardcoded preview credentials
  if (id.toUpperCase() === 'ADMIN' && pass === '123') {
    return { success: true, role: 'USER', project: 'DAHOD SITE', name: 'ADMIN USER' };
  }
  
  if (id.toUpperCase() === 'COORD' && pass === '123') {
    return { success: true, role: 'COORDINATOR', name: 'COORD' };
  }

  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return { success: false, error: "Invalid ID or Password" };
};
