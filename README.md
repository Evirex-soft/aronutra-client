This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
AroNutra
├─ .dist
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ fonts
│  │  ├─ Fontspring-DEMO-biennale-black.otf
│  │  ├─ Fontspring-DEMO-biennale-blackit.otf
│  │  ├─ Fontspring-DEMO-biennale-bold.otf
│  │  ├─ Fontspring-DEMO-biennale-boldit.otf
│  │  ├─ Fontspring-DEMO-biennale-book.otf
│  │  ├─ Fontspring-DEMO-biennale-bookit.otf
│  │  ├─ Fontspring-DEMO-biennale-hair.otf
│  │  ├─ Fontspring-DEMO-biennale-hairit.otf
│  │  ├─ Fontspring-DEMO-biennale-heavy.otf
│  │  ├─ Fontspring-DEMO-biennale-heavyit.otf
│  │  ├─ Fontspring-DEMO-biennale-light.otf
│  │  ├─ Fontspring-DEMO-biennale-lightit.otf
│  │  ├─ Fontspring-DEMO-biennale-medium.otf
│  │  ├─ Fontspring-DEMO-biennale-mediumit.otf
│  │  ├─ Fontspring-DEMO-biennale-regular.otf
│  │  ├─ Fontspring-DEMO-biennale-regularit.otf
│  │  ├─ Fontspring-DEMO-biennale-semibold.otf
│  │  ├─ Fontspring-DEMO-biennale-semiboldit.otf
│  │  ├─ Fontspring-DEMO-biennale-thin.otf
│  │  ├─ Fontspring-DEMO-biennale-thinit.otf
│  │  ├─ Fontspring-DEMO-biennale-ultralight.otf
│  │  └─ Fontspring-DEMO-biennale-ultralightit.otf
│  ├─ images
│  │  ├─ about.png
│  │  ├─ about_img.png
│  │  ├─ apple-touch-icon.png
│  │  ├─ Berry.jpg
│  │  ├─ blend.png
│  │  ├─ Citrus.jpg
│  │  ├─ diff.png
│  │  ├─ enjoy.png
│  │  ├─ eucal.png
│  │  ├─ fav-16x16.png
│  │  ├─ fav-192x192.png
│  │  ├─ fav-32x32.png
│  │  ├─ fav-512x512.png
│  │  ├─ fav.ico
│  │  ├─ hero.png
│  │  ├─ hero_img.png
│  │  ├─ honey.png
│  │  ├─ logo.png
│  │  ├─ Mango.jpg
│  │  ├─ menu_img.jpg
│  │  ├─ mix.png
│  │  ├─ mobile.png
│  │  ├─ nourish.png
│  │  ├─ packet.png
│  │  ├─ Peach.jpg
│  │  ├─ products
│  │  │  ├─ acacia.png
│  │  │  ├─ ajwain.png
│  │  │  ├─ berry.png
│  │  │  ├─ eucalyptus.png
│  │  │  ├─ fennel.png
│  │  │  ├─ herbs.png
│  │  │  ├─ lychee.png
│  │  │  ├─ multiflora.png
│  │  │  ├─ mustard.png
│  │  │  ├─ sesame.png
│  │  │  ├─ thulasi.png
│  │  │  └─ wayanad.png
│  │  ├─ ritual.png
│  │  ├─ site.webmanifest
│  │  └─ wayanad.png
│  └─ video
│     └─ herosection.mp4
├─ README.md
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  └─ [...nextauth]
│  │  │  │     └─ route.ts
│  │  │  ├─ coupons
│  │  │  │  └─ route.ts
│  │  │  ├─ create-order
│  │  │  │  └─ route.ts
│  │  │  ├─ orders
│  │  │  │  └─ route.ts
│  │  │  ├─ products
│  │  │  │  ├─ route.ts
│  │  │  │  └─ [slug]
│  │  │  │     └─ route.ts
│  │  │  ├─ register
│  │  │  │  └─ route.ts
│  │  │  └─ verify-payment
│  │  │     └─ route.ts
│  │  ├─ cart
│  │  │  └─ page.tsx
│  │  ├─ cart-checkout-address
│  │  │  └─ page.tsx
│  │  ├─ checkout
│  │  │  └─ page.tsx
│  │  ├─ checkoutAddress
│  │  │  └─ page.tsx
│  │  ├─ collection
│  │  │  └─ page.tsx
│  │  ├─ contexts
│  │  │  ├─ CartContext.tsx
│  │  │  └─ WishlistContext.tsx
│  │  ├─ cookies
│  │  │  └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  ├─ not-found.tsx
│  │  ├─ order-confirmation
│  │  │  └─ [orderId]
│  │  │     ├─ OrderSuccess.tsx
│  │  │     └─ page.tsx
│  │  ├─ orders
│  │  │  └─ [orderId]
│  │  │     ├─ OrderSuccess.tsx
│  │  │     └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ privacy-policy
│  │  │  └─ page.tsx
│  │  ├─ products
│  │  │  └─ [slug]
│  │  │     ├─ AddToCartSection.tsx
│  │  │     ├─ Continue.tsx
│  │  │     ├─ page.tsx
│  │  │     ├─ ProductActions.tsx
│  │  │     └─ ReviewCard.tsx
│  │  ├─ Providers.tsx
│  │  ├─ refund-policy
│  │  │  └─ page.tsx
│  │  ├─ signup
│  │  │  └─ page.tsx
│  │  ├─ terms-and-conditions
│  │  │  └─ page.tsx
│  │  └─ wishlist
│  │     ├─ page.tsx
│  │     └─ wishlistClient.tsx
│  ├─ components
│  │  ├─ About.tsx
│  │  ├─ auth
│  │  │  └─ AuthWrapper.tsx
│  │  ├─ BottomSection.tsx
│  │  ├─ BrandStory.tsx
│  │  ├─ CartIcon.tsx
│  │  ├─ CouponModal.tsx
│  │  ├─ FAQ.tsx
│  │  ├─ FeatureStrip.tsx
│  │  ├─ FinalCTA.tsx
│  │  ├─ Footer.tsx
│  │  ├─ HeroSection.tsx
│  │  ├─ HowToSip.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ PolicyLayout.tsx
│  │  ├─ ProductCard.tsx
│  │  ├─ ProductCarousel.tsx
│  │  ├─ SingleOrigins.tsx
│  │  ├─ SmoothScroll.tsx
│  │  ├─ Testimonials.tsx
│  │  ├─ UpcomingProduct.tsx
│  │  ├─ WhyChoose.tsx
│  │  └─ WishlistIcon.tsx
│  ├─ constants
│  │  └─ storage.ts
│  ├─ lib
│  │  ├─ data.ts
│  │  ├─ getProducts.ts
│  │  ├─ mongodb.ts
│  │  ├─ mongoose.ts
│  │  └─ reviewsData.ts
│  ├─ middleware.ts
│  ├─ models
│  │  ├─ Order.ts
│  │  ├─ Product.ts
│  │  └─ User.ts
│  ├─ types
│  │  ├─ cart.ts
│  │  ├─ checkout.ts
│  │  └─ product.ts
│  └─ utils
│     ├─ razorpay.ts
│     ├─ razorpay2.ts
│     └─ validations.ts
└─ tsconfig.json

```