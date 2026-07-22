# 🛸 PWNDORA // Browser-Native DFIR Workbench

**Built by Team CyberNexus | Submission for Track T-04: DILE**

PWNDORA is a next-generation, strictly client-side Digital Forensics and Incident Response (DFIR) workbench. Designed to eliminate the friction of cloud uploads and backend processing delays, PWNDORA leverages browser-native APIs to parse, analyze, and map forensic artifacts entirely within local memory. 

This ensures absolute data privacy, rapid triaging, and a zero-trust compliance footprint.

---

## 🚀 Core Features & Judging Alignment

### 1. Zero-Server Parsing Engine (Product Fit)
PWNDORA reads binary artifacts (`.lnk`, `.reg`, `.dat`, `.evtx`) using the native HTML5 `FileReader` API. By processing `ArrayBuffers` directly in the browser, the application completely bypasses the need for a backend server, aligning perfectly with the requirement for a lightweight, browser-native lab product.

### 2. Live Artifact Extraction & Timeline (Working Prototype)
- Automatically extracts target paths, volume serial numbers, and RunKey persistence mechanisms.
- Generates a chronological, unified timeline of suspicious events.
- Features a fictional scenario dashboard (#PWN-2026-03) for immediate analyst onboarding.

### 3. Tactical Analyst Workflow 
Analysts can isolate Indicators of Compromise (IoCs) and tag evidence with standard **MITRE ATT&CK T-codes** (e.g., T1059 for Command & Scripting) directly within the interface. Findings can be exported locally as `JSON` or `CSV` for reporting.

### 4. 🌟 Innovation: Secure Session Purge
Unlike standard web applications, forensic environments require strict data sanitization. We implemented a **"Secure Session Purge"** protocol. When an analyst initiates a logout, PWNDORA explicitly destroys all forensic telemetry and `sessionStorage` buffers before safely ejecting the user to a restricted terminal interface, preventing localized data leaks.

### 5. Security by Design
- **100% Client-Side:** No evidence is ever transmitted over the network.
- **Volatile Storage:** Uses ephemeral browser memory; no persistent local storage of forensic buffers.
- **Zero-Trust UI:** Destructive actions (Session Purge) are visually distinct and functionally absolute.

---

## 🛠️ Technical Architecture

* **Frontend Framework:** React 18
* **Language:** TypeScript (Strict typing for forensic data structures)
* **Styling:** Tailwind CSS (Custom cyber-aesthetic theme)
* **Routing:** React Router DOM v6
* **Build Tool:** Vite (For ultra-fast Hot Module Replacement and optimized builds)

---

## 💻 Local Development & Evaluation Setup

To evaluate the prototype locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Dharun4264/BBDFAW.git](https://github.com/Dharun4264/BBDFAW.git)
   cd BBDFAW/BBDFAW