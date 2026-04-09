# UK HairXpresso — Premium Unisex Salon Website

> 🖤✨ A stunning, mobile-first, static website for **UK HairXpresso Unisex Salon & Tattoo Studio** — Ramtek, Maharashtra.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3.1 | UI Framework |
| **Vite** | 6.0.7 | Build Tool & Dev Server |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS |
| **GSAP** | 3.12.5 | Premium Animations |
| **React Icons** | 5.4.0 | Icon Library |

> ⚠️ **Security**: All dependency versions are pinned exactly (no `^` or `~`). Install with `npm install --ignore-scripts`.

---

## 🚀 Quick Start

```bash
# Install dependencies (secure mode)
npm install --ignore-scripts

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
uk-hairxpresso/
├── public/
│   └── images/                    # All image assets
│       ├── logo_and_name.jpg      # Salon logo
│       ├── hero-bg.png            # Hero background
│       ├── menu_of_hair.png       # Grooming menu card
│       └── ...                    # Salon photos
│
├── src/
│   ├── components/                # React components (1 per section)
│   │   ├── Loader.jsx             # GSAP logo loading animation
│   │   ├── Navbar.jsx             # Sticky navbar + mobile drawer
│   │   ├── Hero.jsx               # Hero with GSAP text animation
│   │   ├── SocialProof.jsx        # Animated stat counters
│   │   ├── Services.jsx           # Grooming package cards
│   │   ├── Offers.jsx             # Deals & discounts
│   │   ├── Gallery.jsx            # Photo grid + lightbox
│   │   ├── Team.jsx               # Stylist profiles
│   │   ├── Instagram.jsx          # Instagram reels section
│   │   ├── Testimonials.jsx       # Review carousel
│   │   ├── StudentDiscount.jsx    # Student discount CTA
│   │   ├── FAQ.jsx                # Accordion Q&A
│   │   ├── WorkingHours.jsx       # Schedule with live status
│   │   ├── Contact.jsx            # Map + contact cards
│   │   ├── Footer.jsx             # Footer with links
│   │   └── WhatsAppFloat.jsx      # Floating WhatsApp button
│   │
│   ├── data/
│   │   └── salonData.js           # ⭐ ALL salon content (single source of truth)
│   │
│   ├── hooks/
│   │   └── useScrollReveal.js     # IntersectionObserver scroll animations
│   │
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind + global styles
│
├── index.html                     # HTML with SEO meta tags
├── package.json                   # Dependencies (pinned versions)
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind theme (black & gold)
├── postcss.config.js              # PostCSS config
└── README.md                      # This file
```

---

## 🎨 Design System

### Color Palette (Black & Gold Luxury)

| Token | Hex | Usage |
|---|---|---|
| `dark-600` | `#0A0A0A` | Primary background |
| `dark-400` | `#111111` | Card backgrounds |
| `dark-200` | `#1A1A1A` | Elevated surfaces |
| `gold-500` | `#D4A843` | Primary gold accent |
| `gold-400` | `#F0D27A` | Hover/light gold |
| `gold-gradient` | `#D4A843 → #F0D27A` | Buttons, badges |

### Typography

| Font | Usage |
|---|---|
| **Playfair Display** | Headings, display text (luxury serif) |
| **Inter** | Body text, descriptions (clean sans) |
| **Outfit** | Labels, badges, small text (modern accent) |

### Animations

- **GSAP**: Hero text character animation, loader logo spin, mobile menu slide, FAQ accordion, floating particles
- **CSS**: Scroll reveal (IntersectionObserver), gold shimmer, pulse glow, spin-slow rings, count-up numbers

---

## 📱 Sections (13 Total)

| # | Section | Key Feature |
|---|---|---|
| 1 | **Loader** | GSAP logo spin-in + loading bar |
| 2 | **Navbar** | Transparent → solid on scroll, mobile drawer |
| 3 | **Hero** | Fullscreen + GSAP text animation + particles |
| 4 | **Social Proof** | Animated count-up numbers |
| 5 | **Services** | 5 grooming package cards with WhatsApp CTA |
| 6 | **Offers** | Seasonal deals with discount badges |
| 7 | **Gallery** | Masonry grid + lightbox + keyboard nav |
| 8 | **Team** | Circular profiles with rotating gold rings |
| 9 | **Instagram** | Reel-style cards with play buttons |
| 10 | **Testimonials** | Auto-play carousel + touch swipe |
| 11 | **Student Discount** | 15% off CTA for KITS College students |
| 12 | **FAQ** | GSAP accordion with gold accents |
| 13 | **Working Hours** | Live open/closed status, today highlight |
| 14 | **Contact** | Dual location cards + Google Maps |
| 15 | **Footer** | Quick links, socials, back-to-top |
| 16 | **WhatsApp Float** | Greeting popup + pulse button |

---

## 📝 Content Management

### Updating Content

All salon content lives in a single file: **`src/data/salonData.js`**

To update anything, edit this file:

```javascript
// Change phone number
export const SALON_INFO = {
  phone1: "9370169876",  // ← Edit here
  ...
};

// Add a new package
export const GROOMING_PACKAGES = [
  ...,
  { id: "new", name: "Bridal Package", price: 5999, ... }
];

// Add a new testimonial
export const TESTIMONIALS = [
  ...,
  { id: 7, name: "New Client", text: "Amazing!", ... }
];
```

### Data Collections

| Export | Maps To (Future DB) | Editable Fields |
|---|---|---|
| `SALON_INFO` | `settings` | Name, phones, WhatsApp, addresses |
| `GROOMING_PACKAGES` | `packages` | Name, price, services list |
| `INDIVIDUAL_SERVICES` | `services` | Category, name, price |
| `OFFERS` | `offers` | Title, discount, validity |
| `TEAM` | `team` | Name, role, photo, specialization |
| `TESTIMONIALS` | `reviews` | Name, text, rating, service |
| `FAQS` | `faqs` | Question, answer |
| `WORKING_HOURS` | `settings.schedule` | Day, time, isOpen |
| `GALLERY_IMAGES` | `gallery` | Image src, alt, category |

---

## 🔮 Future Admin Panel Integration

The codebase is pre-structured for easy admin panel addition:

### Step 1: Add a Backend
Choose one:
- **Firebase** (Firestore + Storage + Auth)
- **Supabase** (PostgreSQL + Storage + Auth)
- **Custom Node.js API** (Express + MongoDB)

### Step 2: Create a Data Context
```jsx
// src/context/DataContext.jsx
const DataContext = createContext();

export function DataProvider({ children }) {
  const [packages, setPackages] = useState([]);
  
  useEffect(() => {
    // Replace static import with API call
    fetch('/api/packages').then(r => r.json()).then(setPackages);
  }, []);

  return <DataContext.Provider value={{ packages }}>{children}</DataContext.Provider>;
}
```

### Step 3: Add Admin Routes
```
/admin/login        → Auth
/admin/dashboard    → Overview
/admin/packages     → CRUD packages
/admin/offers       → CRUD offers
/admin/gallery      → Upload/manage photos
/admin/reviews      → Moderate reviews
/admin/team         → Manage team
/admin/settings     → Hours, contact info
```

### Step 4: Replace Data Imports
Each component currently does:
```jsx
import { GROOMING_PACKAGES } from '../data/salonData';
```
Replace with:
```jsx
const { packages } = useContext(DataContext);
```

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy the `dist/` folder
```

### GitHub Pages
```bash
npm run build
# Push `dist/` to gh-pages branch
```

---

## 📞 Business Details

| | |
|---|---|
| **Salon** | UK HairXpresso Unisex Salon & Tattoo Studio |
| **Phone 1** | 9370169876 |
| **Phone 2** | 9172462427 |
| **WhatsApp** | 8767708514 |
| **Location 1** | Near KITS College, Mauda Road, Ramtek |
| **Location 2** | Killa Road, Nagardhan |
| **Hours** | 9:30 AM – 9:00 PM (All days) |

---

## 📋 TODO (Future Enhancements)

- [ ] Add real Instagram embed (need handle: `@ukhairxpresso`)
- [ ] Update Google Maps embed URL with actual listing
- [ ] Add real team member names and photos
- [ ] Confirm individual service prices
- [ ] Add women's services section
- [ ] Add tattoo portfolio gallery
- [ ] Build admin panel (Firebase/Supabase)
- [ ] Add WhatsApp Business API for automated responses
- [ ] Add online booking calendar
- [ ] Multi-language support (Hindi/Marathi)
- [ ] Progressive Web App (PWA) for offline access
- [ ] Analytics integration (Google Analytics / Plausible)

---

<p align="center">
  <strong>Made with ❤️ in Ramtek, Maharashtra</strong>
</p>
