"use client";

import React, { useState } from "react";
import DeploymentMainContent from "@/components/pages/deployments-main-content";
import DeploymentDetailsPanel, {
  DeploymentDetails,
} from "@/components/pages/deployments-detailed-panels";

export default function DeploymentsPage() {
  const [selectedDeployment, setSelectedDeployment] = useState<string>("dpl_001");

  /**
   * Optional: map deployment ID → detailed data
   * (Later this can come from API / store)
   */
  const deploymentDetailsMap: Record<string, DeploymentDetails> = {
    dpl_001: {
      id: "dpl_001",
      title: "DeFi Vault V2 – Production",
      status: "ready",
      commit: {
        message: "feat: add yield strategy",
        author: "AlexD",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        timestamp: "2 mins ago",
        branch: "main",
        hash: "8a2f9c",
      },
      stages: [
        { name: "Build", duration: "42s", status: "completed", message: "Cached artifacts used" },
        { name: "Test", duration: "1m 20s", status: "completed", message: "All checks passed" },
        { name: "Deploy", duration: "24s", status: "completed", message: "Live on Ethereum" },
      ],
      logs: [
        "> Preparing deployment environment...",
        "> Generating ABI...",
        "> Contract deployed at 0x7a2...9c1",
        "> Verification successful",
      ],
    },
  };

  return (
    <div className="bg-slate-950 text-white w-full h-screen flex overflow-hidden">
      {/* Main Content */}
      <DeploymentMainContent
        selectedDeployment={selectedDeployment}
        onSelectDeployment={setSelectedDeployment}
      />

      {/* Right Preview Panel (same idea as TemplatePreviewPanel) */}
      <DeploymentDetailsPanel
        deployment={deploymentDetailsMap[selectedDeployment]}
      />
    </div>
  );
}
