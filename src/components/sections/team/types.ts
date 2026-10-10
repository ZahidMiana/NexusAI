import type { TeamMember } from "@/types";

/** Contract every operator showcase card implements (Liskov-substitutable). */
export interface MemberCardProps {
  member: TeamMember;
  index: number;
}
