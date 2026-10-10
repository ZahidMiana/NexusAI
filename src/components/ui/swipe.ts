/**
 * Phone-only horizontal swipe row. Below `md` the container scrolls sideways
 * with snap points; from `md` up it hands layout back to the caller's grid.
 * Combine SWIPE_ROW with `md:grid ...` classes, and SWIPE_ITEM on each child.
 */
// Vertical padding (offset by negative margin) keeps card shadows from being clipped by the scroller.
export const SWIPE_ROW =
  "no-scrollbar -mx-4 -my-5 flex items-start snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-5 md:mx-0 md:my-0 md:items-stretch md:gap-6 md:overflow-visible md:px-0 md:py-0";

export const SWIPE_ITEM = "w-[86%] shrink-0 snap-center md:w-auto md:shrink";
