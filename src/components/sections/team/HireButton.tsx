"use client";

import { BriefcaseBusiness } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { useContactLauncher } from "@/context/ContactContext";
import type { TeamMember } from "@/types";

export function HireButton({ member }: { member: TeamMember }) {
  const { openContact } = useContactLauncher();
  return (
    <NeonButton
      accent={member.accent}
      size="sm"
      icon={<BriefcaseBusiness className="h-3.5 w-3.5" />}
      onClick={() => openContact({ projectType: member.hireAs })}
      aria-label={`Hire ${member.name} for a project`}
    >
      Hire for this
    </NeonButton>
  );
}
