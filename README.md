# Angara: wood-fire Indian kitchen

A front-end-only restaurant website for a fictional wood-fire Indian restaurant. It was built as a portfolio project to practise building an immersive, responsive and accessible site with React, TypeScript and Three.js.

**Live demo:** https://angara-restaurant.vercel.app/

![Angara hero section](https://github.com/sikharsethi/angara-restaurant/blob/main/Screenshot%202026-10-06%20115947.png?raw=true)

## Highlights

- **Hero with a live flame.** A custom GLSL shader draws the fire in the centre, with six dishes orbiting around it. The 3D scene is lazy-loaded and skipped on low-power devices and when the user prefers reduced motion.
- **Filterable menu.** Filter by course and by diet (vegetarian, non-vegetarian, spicy). Each dish has a pairing line, a price in rupees and a photo slot that falls back to a placeholder.
- **Seat-picker reservation.** A top-down floor plan with the hearth in the centre. Tap a table, choose a date, time and party size, and the form validates inline. Tables that are too small for the party are disabled.
- **Reviews carousel.** Works with arrow buttons, dots, arrow keys and swipe or drag.
- **Glass buttons and a layered background.** Warm light pools, a vignette and film grain give the page depth.
- **Responsive and accessible.** Mobile-first layout, keyboard-friendly controls, visible focus styles, labelled form fields and `prefers-reduced-motion` support.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 18, TypeScript, Vite |
| Styling | Tailwind CSS v4 |
| 3D | Three.js, React Three Fiber, Drei |
| Animation | GSAP (hero text), Framer Motion (UI transitions) |
| Icons | Lucide React |

## Getting started

You need Node.js 18 or newer.

```bash
git clone https://github.com/sikharsethi/angara-restaurant.git
cd angara-restaurant
npm install
npm run dev
```

Open the address that Vite prints, usually `http://localhost:5173`.

```bash
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
```

## Project structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Scene3D.tsx        # flame shader and sparks (lazy-loaded)
│   ├── About.tsx
│   ├── Menu.tsx
│   ├── Reviews.tsx
│   ├── Reservation.tsx
│   └── Footer.tsx
├── data/
│   ├── menuData.ts        # dishes, prices, pairings
│   ├── heroFoods.ts       # dishes orbiting the flame
│   └── reviewsData.ts     # sample reviews
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css              # theme tokens, glass buttons, background
public/
├── foods/                 # hero dish photos
├── menu/                  # menu dish photos
└── about/                 # About section photos
```

## Customising

- **Menu:** edit `src/data/menuData.ts`. Dishes are strongly typed.
- **Photos:** add images and they replace the placeholders automatically.
  - Hero dishes: `public/foods/` using the file names in `src/data/heroFoods.ts`.
  - Menu dishes: `public/menu/`, named as the dish in lowercase with dashes (`dum-lamb-raan.jpg`).
  - About section: `public/about/hearth.jpg` and `public/about/chef.jpg`.
- **Details:** the address, hours and contact information are placeholders in `src/components/Footer.tsx`.
- **Colours and fonts:** change the theme tokens at the top of `src/index.css`.

## Design and performance decisions

- The hero text and buttons render immediately. The 3D scene loads afterwards with `React.lazy`, so it never blocks the main content.
- The flame is a single shader on one plane instead of a heavy 3D model, which keeps draw calls low.
- The flame is disabled on devices with fewer than four CPU cores and when reduced motion is requested.
- Images are lazy-loaded, and every dish image has a graceful fallback if the file is missing.

## Limitations

This is a demo, not a real booking system.

- There is no backend. The reservation form and the newsletter form do not send or store anything on a server.
- Table availability is simulated. It varies with the date and time you pick but is not real.
- The reservation form keeps only the name, date, time, party size and table in `localStorage` on your own device.
- The restaurant, address, reviews and chef story are fictional placeholders.

## Roadmap

- Photo gallery with a keyboard-accessible lightbox
- Full menu page
- Real photography throughout
