
export type Role = 'USER' | 'COORDINATOR';

export interface UserSession {
  success: boolean;
  // Fix: role is made optional to support responses where login fails and no role is determined
  role?: Role;
  name?: string;
  project?: string;
  error?: string;
}

export interface Worker {
  sl: number;
  name: string;
  father: string;
  pjoin: string;
  pclose: string;
  kjoin: string;
  kclose: string;
  aadhar: string;
  phone: string;
  address: string;
  dob: string;
  mistri: string;
  designation: string;
  pan: string;
  workerPhoto: string;
  adharFront: string;
  adharBack: string;
  panPhoto: string;
  bank: string;
  acc: string;
  ifsc: string;
  bankPhoto: string;
  project: string;
}

export interface AttendanceData {
  headers: string[][];
  data: string[][];
  type: 'PGCIL' | 'KAC';
}

export interface ProjectMapping {
  erectionProj: string;
  erectionLine: string;
  foundationProj: string;
  foundationLine: string;
  stringingProj: string;
  stringingLine: string;
}

export interface ActivityReport {
  project: string;
  workType: 'ERECTION' | 'FOUNDATION' | 'STRINGING';
  supervisor: string;
  accountant: string;
  workDate: string;
  category: string;
  locNo: string;
  locType: string;
  manpower: string;
  district: string;
  lineName: string;
  packageVal: string;
  company: string;
  details: string;
}
