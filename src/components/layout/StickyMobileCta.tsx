"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CONTACT_SECTION_ID } from "@/context/ContactContext";
import { BookCallButton } from "./BookCallButton";

/**
 * Phone-only "Book a free call" bar. Appears once the hero is scrolled past
 * and hides while the contact section is on screen, so it never covers the form.
 */
export function StickyMobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById(CONTACT_SECTION_ID);
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), { rootMargin: "-40% 0px 0px 0px" });
      observer.observe(hero);
      observers.push(observer);
    }
    if (contact) {
      const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting));
      observer.observe(contact);
      observers.push(observer);
    }
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const visible = pastHero && !contactVisible;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 pb-[env(safe-area-inset-bottom)] md:hidden"
        >
          <BookCallButton accent="pink" variant="solid" size="lg" className="w-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
