"use client";

import { FileText } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { useContactLauncher } from "@/context/ContactContext";

export function OpenContactButton({ className }: { className?: string }) {
  const { openContact } = useContactLauncher();
  return (
    <NeonButton accent="pink" className={className} icon={<FileText className="h-4 w-4" />} onClick={() => openContact()}>
      Open project form
    </NeonButton>
  );
}
