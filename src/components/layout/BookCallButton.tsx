"use client";

import { CalendarClock } from "lucide-react";
import { NeonButton, NeonLink, type NeonStyleProps } from "@/components/ui/NeonButton";
import { siteConfig } from "@/config/site";
import { useContactLauncher } from "@/context/ContactContext";

export interface BookCallButtonProps extends NeonStyleProps {
  label?: string;
  className?: string;
}

/**
 * "Book a call": opens the booking page when `siteConfig.contact.bookingUrl`
 * is set, otherwise scrolls to the project form.
 */
export function BookCallButton({ label = "Book a free call", className, ...style }: BookCallButtonProps) {
  const { openContact } = useContactLauncher();
  const { bookingUrl } = siteConfig.contact;
  const icon = <CalendarClock className="h-4 w-4" />;

  return bookingUrl ? (
    <NeonLink href={bookingUrl} target="_blank" rel="noopener noreferrer" icon={icon} className={className} {...style}>
      {label}
    </NeonLink>
  ) : (
    <NeonButton icon={icon} className={className} onClick={() => openContact()} {...style}>
      {label}
    </NeonButton>
  );
}
