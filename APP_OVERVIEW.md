# BlackInkPaper Store App Overview

## Purpose

`blackinkpaper-store` is a Next.js storefront and portfolio app for BlackInkPaper Illustration. It combines an artist landing page, artwork/category discovery, ecommerce product browsing, cart and checkout flows, a blog foundation, and an early admin dashboard for managing catalog data.

The app currently reads most business data from local mock data and has scaffolding for future API-backed ecommerce and blog operations.

## Tech Stack

- **Framework:** Next.js App Router with React 19.
- **Language:** TypeScript.
- **Styling:** Tailwind CSS 4 with custom global utilities and CSS variables in `src/app/globals.css`.
- **State:** Redux Toolkit with React Redux.
- **Forms and validation:** React Hook Form with Zod.
- **Payments:** Razorpay server SDK and checkout script.
- **Motion/media:** Framer Motion, Embla carousel, LightGallery-style artwork modal patterns, Three.js/react-three packages.
- **Tooling:** Biome for linting and formatting.

## App Shell

The root layout in `src/app/layout.tsx` wraps every page with:

- `Providers`, which initializes the Redux store.
- `Navbar`, the public site navigation.
- `Toolbar`, a shared toolbar component.
- A padded `main` region.
- `Footer`, the public footer.

The app uses the `@/*` path alias for imports from `src/*`.

## Main User-Facing Areas

### Landing Page

Route: `/`

The landing page is assembled in `src/app/page.tsx` from focused sections:

- `Hero` for the visual first impression.
- `WorkProjectsGrid` for featured categories/work collections.
- `OriginalWorksBanner` for original artwork promotion.
- `LandingFlipbookContainer` for carousel/lightbox-style artwork exploration.
- `AboutSection` for artist/about content.

This page is currently client-rendered and uses product/category mock data to populate artwork and store previews.

### Store

Route group: `/store` and `/store/shop/*`

The store landing page shows all mock products in a grid and links into product detail pages:

- `/store` renders the main product grid.
- `/store/shop/product/[slug]` resolves a product from `mockProducts`, builds a gallery, displays product text, and renders variant/cart logic.
- `/store/shop/cart` shows persisted cart contents, quantity controls, price breakdowns, and a checkout link.
- `/store/shop/cart/checkout` contains the shipping form, order summary, and Razorpay checkout script.
- `/store/shop/category` and `/store/shop/category/[slug]` exist but are placeholders.
- `/store/shop/product` exists as a placeholder product list page.

Products are modeled through `ProductType`, which groups product information into content, pricing, taxonomy, media, specs, variants, stats, and audit metadata.

### Cart And Checkout

Cart state lives in `src/lib/redux/store/slices/cartSlice.ts`.

Important behavior:

- Cart items are keyed by product id plus selected variants.
- Re-adding the same product/variant combination increments quantity.
- Quantity updates and removals also compare selected variants.
- Cart contents are saved to `localStorage` under `cart_storage`.
- `redux-state-sync` is initialized for cross-tab message listening.

Checkout flow:

- Shipping address validation is handled with React Hook Form and Zod in `shipping-address-form.tsx`.
- Checkout posts an order payload to `/api/create-razorpay-order`.
- The API route creates a Razorpay order using `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
- The client opens Razorpay Checkout using `NEXT_PUBLIC_RAZORPAY_KEY_ID`.

The server route currently includes a comment for the required production price verification, but it does not yet recalculate totals from trusted product data.

### Works / Portfolio

Routes under `/works` exist for a future portfolio browsing experience:

- `/works`
- `/works/[slug]`
- `/works/categories`
- `/works/categories/[slug]`

Most of these routes are currently placeholders. The public navbar already links directly to specific category slugs such as `black-and-white`, `cityscapes`, `commissions`, and `travel-art`.

### Blog

Routes under `/blog` provide the beginning of a content system:

- `/blog` renders a stylized blog landing concept named “THE CANVAS”.
- `/blog/[slug]` fetches a mock article by slug and renders article header, author, categories, and body.
- `/blog/articles` exists as an additional route.

The blog domain has Zod schemas under `src/lib/zod/blog`, endpoint constants under `src/lib/api/blog`, and rendering components under `src/components/blog`.

One important gap: `src/services/blogService.ts` imports mock data from `@/mocks/blog/mock-blog-data`, but no `src/mocks` directory is present in the current app tree.

### Admin

Route group: `/admin/*`

The admin area has a separate layout with a sidebar and dashboard-like pages:

- `/admin` renders dashboard cards for revenue, orders, customers, stock alerts, analytics, recent orders, and recent activity.
- `/admin/products` renders a generic data table over mock product data.
- `/admin/product-categories` and `/admin/product-categories/create` support category list/form workflows.
- `/admin/products/create` exists for product creation.

The admin sidebar links to `/admin/dashboard`, `/admin/orders`, and `/admin/settings`, but those routes are not currently present. The sidebar also uses some placeholder labels from another domain (`L&T Energy Admin`), so it likely needs brand cleanup before production.

## Data And API Layer

The app has two parallel data paths:

### Mock Data

The current UI relies heavily on:

- `src/lib/api/ecommerce/mockdata/mock-product-data.ts`
- `src/lib/api/ecommerce/mockdata/mock-products-list.ts`

This mock data defines product categories, subcategories, tags, and five products representing original works, prints, anatomical studies, and portrait/cityscape-style artwork.

### API Client Scaffolding

`src/lib/api/client.ts` defines a small generic API client around `fetch`, using `NEXT_PUBLIC_API_URL` as the base URL.

If `NEXT_PUBLIC_API_URL` is missing, the request helper returns `null` as the requested type. That keeps mock-driven screens from failing immediately, but production API consumers will need explicit handling for missing configuration.

`productService` is already shaped for CRUD operations against `/products`, while `mockProductService` mirrors some catalog read operations from local data.

## Styling And Design Direction

The app has its own Tailwind token layer in `src/app/globals.css`, including:

- Custom color variables such as `--primary`, `--secondary`, `--muted`, `--accent-1`, and `--accent-2`.
- Custom breakpoints from `xs` through `3xl`.
- A 12-column grid utility system.
- Display, title, heading, body, and caption text utilities.
- Page-height and spacing utilities.

The adjacent `maxwellillustration-design` folder appears to be the design reference. Its `DESIGN.md` describes a dark, warm, editorial art-site direction using Bitter and Young Serif, compact spacing, subtle borders/shadows, expressive motion, and sparse accent color. The current app partially follows the same art-commerce mood, but it currently uses Geist and M PLUS 2 fonts and a mixed light/dark visual language rather than matching the reference exactly.

## Important Components

### Layout And Primitives

- `src/components/_ui/containers/*` provides page, section, grid, stack, and tab/container helpers.
- `src/components/_ui/primitives/*` provides buttons, links, typography, inputs, badges, avatars, and dividers.
- `src/components/_ui/figma/*` contains many generated shadcn-like UI primitives.

### Ecommerce

- `ProductGrid`, `ProductCard`, and `ProductCardWithHover` render catalog views.
- `ProductDetailGallery`, `ProductText`, `VariantSelector`, `QuantitySelector`, and `AddToCartButton` support product detail pages.
- `CartItem`, `CartSummary`, `PriceTag`, and checkout components support cart/checkout flows.

### Blog

- `ArticleCard`, `ArticleHeader`, `AuthorBadge`, and `CategoryPill` cover article listing/header UI.
- `ArticleBody`, `BlockRenderer`, and `InlineRenderer` are intended to render rich text documents.
- Block components include callouts, footnotes, video embeds, paragraphs, lists, headings, quotes, code blocks, and image blocks.

### Admin

- `AdminDashboard` renders dashboard stats and placeholder panels.
- `DataTable` is a reusable table shell with search, add/edit/delete actions, loading state, and pagination controls.
- `createColumnHelper` helps create table column renderers.

## Current Implementation Gaps

- Several public and admin routes linked from navigation are placeholders or missing.
- Blog mock data is imported from a path that does not exist in the current tree.
- Some components still reference older product field names such as `product.coverImageUrl` and `product.price_rupees`, while `ProductType` now stores those values under `product.media` and `product.pricing`.
- Razorpay order creation trusts the submitted `totalAmount`; production checkout should recalculate totals server-side from trusted product and variant data.
- Checkout form submission is not yet wired into the payment step in the visible page flow.
- Root metadata still uses default `Create Next App` title/description.
- Admin labels and links need brand and route cleanup.
- The app has API/client scaffolding, but product, category, blog, and order workflows are still mostly mock-driven.

## How To Run

From `blackinkpaper-store`:

```bash
npm install
npm run dev
```

Useful scripts:

```bash
npm run build
npm run lint
npm run format
```

Required environment variables for API/payment-backed flows:

```bash
NEXT_PUBLIC_API_URL=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
```

## Suggested Next Steps

1. Decide whether the app should fully adopt the `maxwellillustration-design` visual reference or keep the current mixed storefront/admin direction.
2. Fix the product type mismatches in older components.
3. Add or restore the missing blog mock data, or switch blog screens to the API client.
4. Complete the category, works, product listing, and admin routes that navigation already exposes.
5. Harden checkout by recalculating totals server-side before creating Razorpay orders.
6. Replace default metadata and remaining placeholder copy with BlackInkPaper-specific content.
