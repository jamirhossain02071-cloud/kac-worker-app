
import { Worker, ProjectMapping } from './types';

export const mockProjectMapping: ProjectMapping[] = [
  {
    erectionProj: "DAHOD SITE", erectionLine: "LINE A",
    foundationProj: "DAHOD SITE", foundationLine: "LINE B",
    stringingProj: "DAHOD SITE", stringingLine: "LINE C"
  },
  {
    erectionProj: "SURAT SITE", erectionLine: "LINE S1",
    foundationProj: "SURAT SITE", foundationLine: "LINE S2",
    stringingProj: "SURAT SITE", stringingLine: "LINE S3"
  }
];

export const mockWorkers: Worker[] = [
  {
    sl: 1, name: "RAMESH KUMAR", father: "SURESH KUMAR",
    pjoin: "2023-01-15", pclose: "", kjoin: "2023-01-20", kclose: "",
    aadhar: "123412341234", phone: "9876543210", address: "GULAB BAGH, UP",
    dob: "1990-05-10", mistri: "JAGDISH", designation: "SKILLED",
    pan: "ABCDE1234F", workerPhoto: "", adharFront: "", adharBack: "",
    panPhoto: "", bank: "SBI", acc: "1122334455", ifsc: "SBIN0001",
    bankPhoto: "", project: "DAHOD SITE"
  },
  {
    sl: 2, name: "SURESH PRASAD", father: "MAHESH PRASAD",
    pjoin: "2023-02-10", pclose: "", kjoin: "2023-02-15", kclose: "",
    aadhar: "567856785678", phone: "8765432109", address: "PATNA, BIHAR",
    dob: "1992-08-20", mistri: "SANTOSH", designation: "UNSKILLED",
    pan: "FGHIJ5678G", workerPhoto: "", adharFront: "", adharBack: "",
    panPhoto: "", bank: "HDFC", acc: "9988776655", ifsc: "HDFC0002",
    bankPhoto: "", project: "DAHOD SITE"
  }
];

export const mockProjectSummary = [
  ["1", "USER", "DAHOD SITE", "ADMIN", "SANTOSH", "RAMESH", "10", "5", "100", "50", "15", "5", "80", "40"],
  ["2", "USER", "SURAT SITE", "ADMIN", "SANTOSH", "RAMESH", "20", "10", "200", "100", "30", "10", "160", "80"]
];
