# Storefront animation and interaction ideas

The homepage and Originals redesign establishes a calm editorial motion language:
scroll-linked rises, close-detail image reveals, restrained image scaling, responsive
navigation, and clear button transitions. The ideas below extend that language without
turning the shop into a motion demo.

## Recommended next

1. **Product-to-detail image transition**
   Preserve the selected artwork's position and crop as the customer moves from a
   catalogue card to the product page, then settle it into the product gallery. This
   makes navigation feel continuous and keeps the artwork visually anchored.

2. **Cart confirmation drawer**
   After a successful add-to-cart action, spring a compact drawer in from the right with
   the chosen artwork, format, quantity, and subtotal. Keep focus inside the drawer and
   return it to the originating control when dismissed.

3. **Artwork lightbox with progressive zoom**
   Open catalogue imagery into the existing lightbox from the clicked image position.
   Add click/tap zoom, drag-to-pan when zoomed, keyboard navigation, and a visible zoom
   reset. This is especially valuable for the artist's detailed linework.

4. **Filter and pagination continuity**
   Animate catalogue reordering with short layout transitions, retain scroll position,
   and move focus to the updated result heading. Pagination can fade the old group out
   and rise the new group in without blocking navigation.

5. **Image loading reveal**
   Use a paper-coloured placeholder followed by a subtle opacity reveal once each image
   decodes. Reserve the final aspect ratio from the start so no product card shifts.

## Small moments with high value

- Spring the cart-count badge once when its value increases; announce the new count to
  assistive technology without repeatedly interrupting the customer.
- Give variant and size selections a short shared highlight that moves between options,
  with price changes cross-fading in place.
- Animate validation messages into the checkout form directly below the affected field
  and move focus only when submission fails.
- Turn newsletter submission into an inline success state instead of replacing or
  jumping the form.
- Add a gentle press response to primary buttons and artwork acquisition controls, with
  a smaller movement than their hover response.
- Preserve catalogue position on browser back so customers return to the same artwork
  and scroll point.
- Use an understated progress indicator while checkout or payment requests are pending;
  prevent double submission while keeping the selected order summary visible.
- Fade availability changes between `Available`, `Reserved`, and `Sold` without changing
  the card's dimensions.

## Guardrails

- Respect `prefers-reduced-motion` and keep every action fully usable with motion off.
- Animate `transform`, `opacity`, and layout only when needed; avoid continuous effects
  that compete with the artwork or consume battery.
- Use 150–300ms for controls and 300–500ms for page or gallery transitions.
- Never delay navigation, cart confirmation, or checkout feedback to finish an animation.
- Keep keyboard focus visible throughout overlays, drawers, filters, and lightboxes.
- Test hover ideas with touch and keyboard equivalents; important information must never
  exist only on hover.
