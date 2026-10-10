import { ArrowLeft } from "lucide-react";

export interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
}

export function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  return (
    <div className="flex items-center gap-2 border-b border-zinc-900 px-3 py-2">
      <button type="button" onClick={onBack} className="rounded p-1 text-zinc-400 transition-colors hover:text-cyber-lime" aria-label="Back to home screen">
        <ArrowLeft className="h-4 w-4" />
      </button>
      <span className="truncate font-tech text-xs tracking-[0.12em] text-cyber-lime uppercase">{title}</span>
    </div>
  );
}
