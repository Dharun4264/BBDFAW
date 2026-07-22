# Commercial Product Integration: PWNDORA Roadmap
**Submission ID:** BSCDS26-DILE-01  

## 1. Product Fit & Commercial Viability
PWNDORA bridges the operational gap between heavy, installed desktop triage suites (like FTK or RegRipper) and rapid web-based incident response. By integrating directly into the BlackPerl DFIR product ecosystem, this workbench provides tier-1 SOC analysts and field investigators with an instant, zero-install triage portal.

## 2. Key Forensic Extractors
* **Windows Event Logs (`.evtx`):** Automatically maps critical authentication events (e.g., Event IDs 4624 successful logins and 4625 failed brute-force attempts).
* **Registry & LNK Artifacts:** Extracts target paths, MAC timestamps, and machine IDs to reconstruct user activity timelines during incident scoping.
* **MITRE ATT&CK T-Code Tagging:** Automatically associates anomalies with recognized adversary tactics and techniques for immediate report generation.

## 3. Deployment & Verification
To launch the workbench locally for evaluation:
```bash
git clone [https://github.com/Dharun4264/BBDFAW.git](https://github.com/Dharun4264/BBDFAW.git)
cd BBDFAW/BBDFAW
npm install
npm run dev