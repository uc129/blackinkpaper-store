src/
  app/
    (public)/
      layout.tsx
      page.tsx
      
    blog/
      layout.tsx
      page.tsx
      [slug]/
        page.tsx
      category/
        [category]/
          page.tsx
      author/
        [authorId]/
          page.tsx

    videos/
      layout.tsx
      page.tsx
      [slug]/
        page.tsx

    shop/
      layout.tsx
      page.tsx
      product/
        [productId]/
          page.tsx
      designer/
        [designerId]/
          page.tsx

  components/
    primitives/       <-- tokens + base components
    ui/               <-- compound components
    blog/             <-- blog-specific pieces
    video/
    shop/
  
  lib/
    api/
      blog.ts
      videos.ts
      products.ts
    helpers/
    types/

  styles/
    globals.css
    typography.css
    tailwind.css → @tailwind base/components/utilities
