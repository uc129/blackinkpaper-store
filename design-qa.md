# Storefront redesign QA

## Reference and implementation

- Source: user-supplied `Blackinkpaper storefront redesign.zip` (kept locally at `docs/Blackinkpaper storefront redesign.zip`; intentionally excluded from this public repository by request).
- Source screens: `Homepage Redesign.dc.html` and `Originals.dc.html`
- Follow-up hero source: `docs/reference/inputs/homepage-hero-scale-position-reference.jpg`, optimized to 2400 x 1223 from the user-supplied 4684 x 2388 screenshot.
- Implementation: `http://localhost:3001/` and `http://localhost:3001/store/shop/category/originals`
- Reference canvas: 1440px desktop composition; captured source preview was 3032 x 4200 physical pixels.
- Implementation viewports: 2491 x 1524 at 2x DPR for desktop review and 390 x 844 at 1x DPR for mobile review.
- Screenshot evidence: captured in the connected Chrome session during QA; the browser integration did not expose persistent filesystem paths.

## Compared states

- Full homepage: hero, available-originals grid, print rail, artist story, close-up strip, and footer transition.
- Full Originals page: breadcrumb, collection title and count, category tabs, staggered catalogue, pagination, assurance copy, and suggestions rail.
- Focused interactions: artwork hover/focus zoom, product links, editorial category tabs, pagination to page 2, mobile navigation open/close, and responsive stacking.
- Data state: live storefront API products, prices, availability, and category counts. Authentication remained logged out; the existing local cart state was retained.

## Issues found and resolved

1. Desktop navigation was hidden because its previous utility breakpoint was absent from the generated stylesheet. Replaced the brittle dependency with explicit semantic navigation classes and verified Store, About, Contact, Cart, and Login at desktop width.
2. The mobile Originals heading caused horizontal overflow. Added a viewport-aware type clamp and verified `scrollWidth` equals the 390px viewport.
3. Mobile menu behavior depended on querying and hiding the entire `nav` element. Replaced it with native accessible controls, explicit expanded state, and dedicated menu classes; verified open and close behavior on the canonical `localhost` origin.
4. The first catalogue image produced an LCP advisory. Added preload priority to the first collection image.
5. Follow-up P2: the homepage showed only two originals after cross-section deduplication let print variants claim artwork identities. Originals now receive selection priority, with prints deduplicated afterward; the rendered homepage exposes exactly four original artwork cards.
6. Follow-up P2: the hero artwork was centered and visually smaller than the supplied crop. The desktop image is now scaled to 118%, offset 24% to the right, and placed over a matching paper surface so the left paper field and cropped right edge follow the reference. Tablet and mobile use restrained responsive offsets to preserve content visibility.

## Follow-up comparison evidence

- Full-view source and implementation were opened in the same browser comparison pass.
- Desktop implementation viewport: 1600 x 816 CSS pixels at 1x DPR; hero frame: 1480 x 736 CSS pixels.
- Focused hero evidence: the left paper field, central reclining figure, off-frame right crop, text anchoring, typography, overlay color, and section transition were compared. No actionable P0/P1/P2 mismatch remains for the requested crop change.
- Focused grid evidence: the DOM, accessibility tree, and scrolled visual capture all show Apsara, Blue Relief, Ganesha Stele, and The Brass Shop. The page has no horizontal overflow at the desktop verification viewport.
- The desktop hero change is isolated from the existing mobile treatment through the 987px and 639px responsive rules; the mobile rule retains its existing 106% scale and 2% safe offset.

## Intentional differences from the reference

- Product names, prices, availability, edition status, counts, and imagery come from the live storefront API rather than prototype placeholders.
- Links, pagination, cart, authentication, and category navigation use the application's real routes and state.
- The prototype supplied a fixed-width desktop canvas. The implementation adds a deliberate mobile layout instead of clipping that canvas.
- Signed/edition language is shown only where supported by application data; the print rail's starting price is calculated from current inventory.

## Verification

- `npm run build`: passed
- `npm test`: 7 files and 25 tests passed
- Biome check: passed with advisory-only CSS specificity-order warnings
- `git diff --check`: passed
- Browser console: no application error; one development-only hydration notice was traced to a Chrome extension mutating the root element.

final result: passed

## Product-detail follow-up

- Source references: `docs/reference/inputs/product-detail-original-reference.png`, `product-detail-print-reference.png`, and `product-detail-related-works-reference.png` (exact copies of the supplied screenshots).
- Separate existing product routes remain intact; original products render a fixed one-of-one purchase panel, while print products render live edition options and quantity controls. No Original/Print switcher was added.
- Reference composition implemented: dark two-column gallery and purchase panel, accession tag, thumbnails, zoom lightbox, metadata and description, original specification grid, print edition cards, purchase CTA, disclosure rows, and related-work rail.
- Live-data differences: price, stock, variant labels, media, signed state, certificate state, and catalogue details reflect the storefront API rather than screenshot placeholders.
- Runtime verification: `GET /store/shop/product/apsara` and `GET /store/shop/product/blue-relief-print` both returned HTTP 200 from the repaired development server, with their respective route-specific content in server-rendered HTML.
- Interaction verification: component tests cover original-only controls, print edition selection, price and fulfillment changes, quantity stock limits, and the route-specific CTA. Total suite: 8 files, 27 tests passing. TypeScript and production build pass.
- Visual comparison remains unverified: Chrome computer-use access was denied during this follow-up, so no claim of pixel-level parity or responsive browser QA is made for the product pages.
- Startup repair: the ignored `.next/dev/cache/turbopack/v16.3.3-a9a1cb78` database had duplicate `* 2` files and caused `invalid digit found in string`. It was recoverably renamed to `.next/dev/cache/turbopack/v16.3.3-a9a1cb78.corrupt-20260916`; Next regenerated a clean cache and the dev server started on port 3000.
