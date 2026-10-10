import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Accent } from "@/types";

export interface NeonStyleProps {
  accent?: Accent;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES: Record<NonNullable<NeonStyleProps["size"]>, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-xs gap-2",
  lg: "min-h-12 py-3 px-5 text-xs gap-2.5 sm:px-6 sm:text-sm",
};

/** Shared neon styling so buttons and links stay visually identical. */
export function neonClasses({ accent = "pink", variant = "outline", size = "md" }: NeonStyleProps): string {
  const tokens = accentTokens(accent);
  const variantClasses = {
    solid: cn(tokens.bg, "text-on-accent border border-transparent hover:brightness-110", tokens.glow),
    outline: cn("border bg-inset", tokens.borderSoft, tokens.text, tokens.hoverBorder, tokens.hoverGlow, tokens.hoverBgSoft),
    ghost: cn("border border-transparent text-fg-muted hover:text-fg", tokens.hoverBgSoft),
  }[variant];

  return cn(
    "neon-btn",
    `neon-btn-${variant}`,
    "relative inline-flex max-w-full items-center justify-center rounded-lg font-display font-semibold tracking-[0.12em] uppercase",
    "transform-gpu transition-all duration-300 ease-hardware active:scale-95 disabled:pointer-events-none disabled:opacity-40",
    SIZE_CLASSES[size],
    variantClasses,
  );
}

export interface NeonButtonProps extends NeonStyleProps, ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
}

export function NeonButton({ accent, variant, size, icon, className, children, type = "button", ...rest }: NeonButtonProps) {
  return (
    <button type={type} className={cn(neonClasses({ accent, variant, size }), className)} {...rest}>
      {icon}
      <span className="text-center">{children}</span>
    </button>
  );
}

export interface NeonLinkProps extends NeonStyleProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: ReactNode;
  children: ReactNode;
}

export function NeonLink({ accent, variant, size, icon, className, children, ...rest }: NeonLinkProps) {
  return (
    <a className={cn(neonClasses({ accent, variant, size }), className)} {...rest}>
      {icon}
      <span className="text-center">{children}</span>
    </a>
  );
}
