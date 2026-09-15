# Black Ink Paper — "Add Original" vs "Add Print" flows

A design brief for the two admin product-creation experiences, following the
Originals/Prints catalogue restructure.

## Context

The catalogue now has **two top-level categories — Originals and Prints** — each
with sub-categories (a 2-level taxonomy). Every product shares a common core plus
an **Art Specifications** block whose relevant fields differ by type. A hard
business rule distinguishes the two, so the admin "create product" experience
should branch into **two distinct flows** after the author picks the type.

## Shared fields (both flows)

Name · SKU / Product ID · Slug · Artist · **Category + Sub-category** ·
Description + Short description · Pricing (Base price, Final price, Currency) ·
Cover image + Header image · Gallery images · Tags · Availability (live/draft) ·
Featured.

## The branch point — the one rule that splits the flows

A product flagged **Original** (`IsOriginal = true`) MUST:

- have **Stock quantity = exactly 1** (a single unique piece), and
- **not use standard variants** (no size/format matrix).

This is enforced server-side (returns a validation error otherwise) and inline in
the admin form. The two flows genuinely diverge — not just the same form with a
toggle.

## Print flow

- **Uses variants**: a standard-variant matrix — Size (A4/A3…) and Format
  (Digital Download / Fine Art Print). Stock lives on variants; a print can be
  multi-stock.
- **Art specs shown**: File format, Resolution (DPI), Pixel dimensions (digital),
  Material, Physical dimensions (W×H + unit), Weight, Framed toggle.
- Mental model: a reproducible product with options.

## Original flow

- **No variants. Quantity is fixed at 1** — surface this as a fact, not an
  editable field (e.g. a "1 of 1 / unique piece" affordance).
- **Provenance & tools fields** (the extra detail the client asked for): Paper
  type, Paper weight, Ink / medium, Material, Physical dimensions (W×H + unit),
  Weight, Framing status, **Signed** (toggle), **Certificate of authenticity**
  (toggle).
- Mental model: a one-of-a-kind artwork with authenticity/craft details.

## Data field names (labels → payload mapping)

Art specs object (`ArtSpecs`): `PhysicalDimensions {Width, Height, Unit}`,
`WeightGrams`, `IsFramed`, `Material`, `FileFormat`, `ResolutionDpi`,
`PixelDimensions`, **`PaperType`, `PaperWeight`, `InkType`, `IsOriginal`,
`IsSigned`, `HasCertificate`, `FramingStatus`**.

## API surface the flows use

- **Create**: `POST /api/admin/products` · **Update**: `PUT /api/admin/products/{id}`
  (both take the product core + `ArtSpecs`).
- **Taxonomy pickers**: `GET /api/admin/product-options/categories` and
  `…/subcategories?categoryId=` (admin); public equivalents at
  `GET /api/catalog/categories` / `…/subcategories?categoryId=`.
- **Storefront listing**: `GET /api/products?categoryId=|categorySlug=originals&subCategorySlug=…`
  → summaries include `IsOriginal` (badge originals in grids).
- **Storefront detail**: `GET /api/products/{id}` or `/slug/{slug}` → returns full
  `ArtSpecs` (paper, ink, signed, certificate, framing) for an Original's page.

## Suggested flows to design

1. **Type chooser** (entry): "Original (1-of-1)" vs "Print (reproducible)" — sets
   the branch.
2. **Add Original**: core fields → provenance/tools section → single-piece
   confirmation (no variant/stock UI) → images → publish.
3. **Add Print**: core fields → variant/size/format builder + stock →
   digital/print specs → images → publish.
4. **Storefront**: Originals collection page (unique-piece treatment, provenance
   on detail) vs Prints (size/format selector, "buy print").
