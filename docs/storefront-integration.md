# Storefront integration — Originals/Prints changes

What the client store app needs to incorporate the Originals/Prints restructure
and the artwork-detail additions.

## 1. New public endpoints to consume

- `GET /api/catalog/categories` → the top categories (Originals, Prints) with
  `id`, `name`, `slug`, `description`, `coverImageUrl`, `isFeatured`. **New** —
  categories were previously admin-only. Use to build the top nav.
- `GET /api/catalog/subcategories?categoryId={id}` → sub-categories for a category
  (Originals → Commissions; Prints → Black & White, Cityscapes, Travel Art). Use
  for filter chips / sub-nav.

## 2. Changed response shapes (additive — nothing removed)

- **Product summary** (`GET /api/products`) now includes **`isOriginal`** → badge
  originals in grids and choose the right product-card treatment.
- **Product detail** (`GET /api/products/{id}`, `/api/products/slug/{slug}`)
  `artSpecs` now includes **`paperType`, `paperWeight`, `inkType`, `isOriginal`,
  `isSigned`, `hasCertificate`, `framingStatus`** → render the provenance/tools
  block on an Original's page.

## 3. New query capabilities on the listing endpoint

- `GET /api/products?categorySlug=originals` and `&subCategorySlug=cityscapes` —
  filter by **slug**, not just numeric id. Lets `/shop/originals` map straight to
  the API. Numeric `categoryId`/`subCategoryId` still work.

## 4. Taxonomy semantics / routing

- Two top categories: **Originals** (`slug: originals`), **Prints**
  (`slug: prints`).
- **Do not hardcode category IDs.** IDs differ between environments (seed vs live
  assign them differently; the migration leaves non-contiguous sub-category ids).
  Always fetch from `/api/catalog/*` and key off **slug**.

## 5. Two product-page templates, keyed on `isOriginal`

- **Original**: no size/format selector; show "1 of 1 / unique piece"; render
  provenance (paper, ink, dimensions, weight, framing, signed, certificate); once
  sold it's gone (single piece).
- **Print**: variant selector (size/format), per-variant stock/pricing, digital
  vs physical fulfillment.

## 6. Availability behavior (already in place)

Public product endpoints hide unavailable items: `GetById`/`GetBySlug` return
**404** when `isAvailable = false`, and search forces `isAvailable = true`. The
storefront just needs to handle 404 gracefully.

## 7. Sold-out behavior for Originals — see the inventory findings

Whether a purchased Original disappears from the shop depends on the
checkout/inventory path. See `docs/originals-inventory-findings.md` for the
traced behavior and any gaps.
