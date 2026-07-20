import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <h1 className="text-3xl text-cyan-400">BBDFAW Dashboard</h1>
      <p className="mt-4 text-slate-300">
        Browser-Based Digital Forensics Artifact Workbench
      </p>
    </Layout>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);