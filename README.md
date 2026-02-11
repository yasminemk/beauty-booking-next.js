# Beauty Studio Website

A minimal luxury, config-driven Next.js website for a beauty business.

## Features

- **Tech Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS.
- **Design**: Soft glam, minimal luxury aesthetic (Black/White/Grey).
- **Config-Driven**: All content is managed in `src/content/siteContent.ts`.
- **Pages**:
  - `/` (Home): Hero section, featured services, testimonials.
  - `/services`: Full list of services with prices and durations.
  - `/gallery`: Responsive grid with lightbox (keyboard navigation enabled).
  - `/book`: Booking call-to-action.
  - `/contact`: Contact details.
  - `/policies`: Studio policies.
- **Components**: Sticky header, responsive navigation, footer with auto-copyright.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    npm start
    ```

## Customization

### Content
Edit `src/content/siteContent.ts` to update:
- Brand name and contact info.
- Navigation links.
- Services (categories, items, prices).
- Gallery images.
- Policies and testimonials.

### Images
Place your images in `public/gallery/` and update the paths in `src/content/siteContent.ts`.

### Styling
- Colors and fonts are configured in `tailwind.config.ts` and `src/app/globals.css`.
- The theme uses `Inter` (sans) and `Playfair Display` (serif).
# beauty-booking-next.js
