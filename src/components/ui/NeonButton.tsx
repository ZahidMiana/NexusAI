import type { ButtonHTMLAttributes, ReactNode } from "react";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Accent } from "@/types";

export interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  accent?: Accent;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const SIZE_CLASSES: Record<NonNullable<NeonButtonProps["size"]>, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-xs gap-2",
  lg: "min-h-12 py-3 px-5 text-xs gap-2.5 sm:px-6 sm:text-sm",
};

export function NeonButton({
  accent = "pink",
  variant = "outline",
  size = "md",
  pulse = false,
  icon,
  className,
  children,
  type = "button",
  ...rest
}: NeonButtonProps) {
  const tokens = accentTokens(accent);

  const variantClasses = {
    solid: cn(tokens.bg, "text-black border border-transparent hover:brightness-110", tokens.glow),
    outline: cn("border bg-black/40", tokens.borderSoft, tokens.text, tokens.hoverBorder, tokens.hoverGlow, tokens.hoverBgSoft),
    ghost: cn("border border-transparent text-zinc-400 hover:text-white", tokens.hoverBgSoft),
  }[variant];

  return (
    <button
      type={type}
      className={cn(
        "relative inline-flex max-w-full items-center justify-center rounded-lg font-display font-semibold tracking-[0.12em] uppercase",
        "transform-gpu transition-all duration-300 ease-hardware active:scale-95 disabled:pointer-events-none disabled:opacity-40",
        SIZE_CLASSES[size],
        variantClasses,
        pulse && accent === "pink" && "animate-neon-pulse",
        className,
      )}
      {...rest}
    >
      {icon}
      <span className="text-center">{children}</span>
    </button>
  );
}
