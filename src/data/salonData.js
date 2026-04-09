// ============================================================
// UK HairXpresso — Central Data Store (Production Ready)
// ============================================================
// All salon content lives here. When building an admin panel,
// replace these exports with API calls / database reads.
// ============================================================

export const SALON_INFO = {
  name: "UK HairXpresso",
  tagline: "Premium Unisex Salon & Tattoo Studio",
  subtitle: "Where Style Meets",
  subtitleAccent: "Luxury",
  description: "Ramtek & Nagardhan's finest grooming destination. Expert cuts, beard styling, hair spa — crafted with precision for every look.",
  phone1: "9370169876",
  phone2: "9172462427",
  whatsapp: "918767708514",
  whatsappMessage: "Hi! I'd like to book an appointment at UK HairXpresso ✂️",
  whatsappLink: "https://wa.me/918767708514?text=Hi!%20I'd%20like%20to%20book%20an%20appointment%20at%20UK%20HairXpresso.",
  email: "contact@ukhairxpresso.com",
  instagram: "uk_hair_xpresso",
  instagramUrl: "https://www.instagram.com/uk_hair_xpresso/",
  facebook: "ukhairxpresso",
  googleReviewUrl: "https://g.page/r/uk-hairxpresso",
  googleMapsEmbed: "https://maps.google.com/maps?q=Ramtek+Maharashtra+India+near+KITS+College&output=embed&z=14",
  googleMapsLink: "https://maps.google.com/?q=UK+HairXpresso+Ramtek+Maharashtra",
  locations: [
    {
      id: 'ramtek',
      name: "Ramtek Branch",
      address: "Old Blue Tick Café, Near KITS College, Mauda Road, Ramtek, Maharashtra – 441106",
      landmark: "Old Blue Tick Café",
      phone1: "9370169876",
      phone2: "9172462427",
      mapQuery: "Old+Blue+Tick+Cafe+Near+KITS+College+Mauda+Road+Ramtek+Maharashtra",
      hours: "Mon–Sat: 9AM–9PM | Sun: 10AM–7PM",
      primary: true,
    },
    {
      id: 'nagardhan',
      name: "Nagardhan Branch",
      address: "Killa Road, Nagardhan, Maharashtra",
      landmark: "",
      phone1: "9370169876",
      phone2: null,
      mapQuery: "Nagardhan+Maharashtra+India",
      hours: "Mon–Sat: 9AM–9PM | Sun: 10AM–7PM",
      primary: false,
    }
  ]
};

export const WORKING_HOURS = {
  schedule: [
    { day: "Monday", time: "9:00 AM – 9:00 PM", isOpen: true },
    { day: "Tuesday", time: "9:00 AM – 9:00 PM", isOpen: true },
    { day: "Wednesday", time: "9:00 AM – 9:00 PM", isOpen: true },
    { day: "Thursday", time: "9:00 AM – 9:00 PM", isOpen: true },
    { day: "Friday", time: "9:00 AM – 9:00 PM", isOpen: true },
    { day: "Saturday", time: "9:00 AM – 9:00 PM", isOpen: true },
    { day: "Sunday", time: "10:00 AM – 7:00 PM", isOpen: true }
  ]
};

export const GROOMING_PACKAGES = [
  {
    id: "standard",
    name: "Standard Package",
    price: 299,
    originalPrice: null,
    badge: null,
    featured: false,
    services: ["Haircut", "Hair Wash", "Beard Set", "Clean-Up"],
    whatsappMsg: "Hi! I'd like to book the Standard Package (₹299)"
  },
  {
    id: "semi-standard",
    name: "Semi Standard",
    price: 499,
    originalPrice: null,
    badge: null,
    featured: false,
    services: ["Haircut", "Hair Wash", "Beard Set", "D-Tan"],
    whatsappMsg: "Hi! I'd like to book the Semi Standard Package (₹499)"
  },
  {
    id: "mid",
    name: "Mid Package",
    price: 999,
    originalPrice: 1399,
    badge: "Most Popular",
    featured: true,
    services: ["Haircut", "Hair Wash", "Beard Set", "Hair Spa", "Head Massage", "Fruit Facial"],
    whatsappMsg: "Hi! I'd like to book the Mid Package (₹999)"
  },
  {
    id: "pre-grooming",
    name: "Pre-Grooming Package",
    price: 2999,
    originalPrice: null,
    badge: "Premium",
    featured: false,
    services: ["Hair Wash", "Haircut", "Beard Set", "Hair Spa", "Manicure & Pedicure", "O3+ Facial", "Body Polishing", "Body Trimming"],
    whatsappMsg: "Hi! I'd like to book the Pre-Grooming Package (₹2999)"
  },
  {
    id: "pro",
    name: "Pro Package",
    price: 3999,
    originalPrice: null,
    badge: "Elite",
    featured: false,
    services: ["Haircut", "Shaving", "Hair Wash (2×)", "Hair Spa", "D-Tan", "Body Polishing", "Body Trimming"],
    whatsappMsg: "Hi! I'd like to book the Pro Package (₹3999)"
  }
];

export const INDIVIDUAL_SERVICES = [
  { category: "Hair", items: [
    { name: "Haircut", price: "₹100+" },
    { name: "Hair Wash & Style", price: "₹150+" },
    { name: "Hair Coloring", price: "₹500+" },
    { name: "Hair Spa", price: "₹400+" },
    { name: "Keratin Treatment", price: "₹2000+" }
  ]},
  { category: "Beard & Face", items: [
    { name: "Beard Trim & Set", price: "₹80+" },
    { name: "Clean Shave", price: "₹100+" },
    { name: "Fruit Facial", price: "₹300+" },
    { name: "O3+ Facial", price: "₹500+" },
    { name: "D-Tan", price: "₹250+" }
  ]},
  { category: "Body Care", items: [
    { name: "Body Polishing", price: "₹800+" },
    { name: "Body Trimming", price: "₹300+" },
    { name: "Manicure", price: "₹200+" },
    { name: "Pedicure", price: "₹250+" },
    { name: "Head Massage", price: "₹150+" }
  ]},
  { category: "Tattoo", items: [
    { name: "Small Tattoo", price: "₹500+" },
    { name: "Medium Tattoo", price: "₹1500+" },
    { name: "Large Tattoo", price: "₹3000+" },
    { name: "Custom Design", price: "On Consultation" }
  ]}
];

export const OFFERS = [
  {
    id: 1,
    title: "10% OFF for Students",
    description: "Show valid college ID · Valid at both locations",
    badge: "Student Special",
    type: "highlight",
    ctaText: "Claim Offer",
    icon: "student"
  },
  {
    id: 2,
    title: "Summer Glow Package",
    description: "20% off on all hair treatment services during summer. D-Tan, Hair Spa, Facials — look your best this season.",
    badge: "Seasonal Offer",
    type: "card",
    ctaText: "Book Summer Deal",
    icon: "tag"
  },
  {
    id: 3,
    title: "First Visit Bonus",
    description: "First time at UK HairXpresso? Get a FREE consultation + complimentary head massage with any package.",
    badge: "New Visitors",
    type: "card",
    ctaText: "Book First Visit",
    icon: "gift"
  }
];

export const TEAM = [
  {
    id: 1,
    name: "Umar Khan",
    role: "Master Stylist & Founder",
    specialization: "Hair Cuts & Creative Styling",
    experience: "8+ Yrs",
    image: "/images/photo_2_2026-04-01_22-25-06.jpg"
  },
  {
    id: 2,
    name: "Kavya Sharma",
    role: "Senior Hair Artist",
    specialization: "Coloring & Hair Treatments",
    experience: "6+ Yrs",
    image: "/images/3546062976925447943.jpg"
  },
  {
    id: 3,
    name: "Rohit Patil",
    role: "Beard & Grooming Expert",
    specialization: "Beard Sculpting & Styling",
    experience: "6+ Yrs",
    image: "/images/3548876323752228406.jpg"
  },
  {
    id: 4,
    name: "Priya Nair",
    role: "Senior Esthetician",
    specialization: "Facials & Skincare",
    experience: "5+ Yrs",
    image: "/images/photo_1_2026-04-01_22-25-06.jpg"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul Meshram",
    avatar: "R",
    service: "Mid Package",
    rating: 5,
    date: "2 weeks ago",
    text: "Best haircut I have ever had in Ramtek! The Mid Package is totally worth it. Staff is professional and the salon is super clean.",
    color: "bg-red-500"
  },
  {
    id: 2,
    name: "Priya Kulkarni",
    avatar: "P",
    service: "Hair Spa",
    rating: 5,
    date: "1 month ago",
    text: "Finally a premium salon in our town! The hair spa treatment was amazing. Very skilled team and excellent service. Highly recommend!",
    color: "bg-purple-500"
  },
  {
    id: 3,
    name: "Aarav Pande",
    avatar: "A",
    service: "Haircut + Beard",
    rating: 5,
    date: "3 weeks ago",
    text: "Student discount is a great deal! Clean, modern setup and the stylists know what they are doing. Best value for money in Ramtek.",
    color: "bg-blue-500"
  },
  {
    id: 4,
    name: "Sneha Deshmukh",
    avatar: "S",
    service: "Pre-Grooming Package",
    rating: 5,
    date: "1 month ago",
    text: "Got the Pre-Grooming Package before my cousin's wedding. The O3 facial was incredible! Will definitely come back every month.",
    color: "bg-green-500"
  },
  {
    id: 5,
    name: "Vikas Thakre",
    avatar: "V",
    service: "Beard Design",
    rating: 5,
    date: "6 days ago",
    text: "Very professional setup. The beard design turned out exactly how I wanted. Quick service, friendly staff. 10/10 would recommend!",
    color: "bg-yellow-600"
  },
  {
    id: 6,
    name: "Kiran Nagpure",
    avatar: "K",
    service: "Pro Package",
    rating: 5,
    date: "2 months ago",
    text: "UK HairXpresso is the only salon I visit now. The Pro Package is incredible value. Head massage is so relaxing. Love this place!",
    color: "bg-pink-600"
  }
];

export const SOCIAL_PROOF = {
  happyClients: 5000,
  yearsExperience: 5,
  locations: 2,
  avgRating: 4.9
};

export const MARQUEE_TEXT = [
  "LUXURY GROOMING", "SINCE 2019", "BEARD STYLING", "UK HAIRXPRESSO",
  "RAMTEK", "HAIR COLORING", "HAIR SPA", "TATTOO STUDIO",
  "MANICURE", "NAGARDHAN", "PREMIUM PRODUCTS", "EXPERT STYLISTS"
];

export const GALLERY_IMAGES = [
  { id: 1, src: "/images/pexels-photo-3065209.jpeg", alt: "Classic Fade + Beard", category: "Haircut", afterSrc: "/images/pexels-photo-3998421.jpeg" },
  { id: 2, src: "/images/pexels-photo-1805600.jpeg", alt: "Premium Cut & Style", category: "Haircut", afterSrc: "/images/pexels-photo-3037244.jpeg" },
  { id: 3, src: "/images/pexels-photo-2901184.jpeg", alt: "Beard Sculpting", category: "Beard", afterSrc: "/images/3548876323752228406.jpg" },
  { id: 4, src: "/images/pexels-photo-3065171.jpeg", alt: "Color Treatment", category: "Color", afterSrc: "/images/3546062976925447943.jpg" },
  { id: 5, src: "/images/pexels-photo-3997383.jpeg", alt: "Hair Spa Treatment", category: "Spa", afterSrc: "/images/pexels-photo-3992874.jpeg" },
  { id: 6, src: "/images/pexels-photo-2531551.jpeg", alt: "Royal Shave", category: "Beard", afterSrc: "/images/pexels-photo-1319461.jpeg" },
];

export const GALLERY_FILTERS = ["All", "Haircut", "Beard", "Color", "Spa"];

export const INSTAGRAM_POSTS = [
  "/images/3546062976925447943.jpg",
  "/images/3548876323752228406.jpg",
  "/images/photo_2_2026-04-01_22-25-06.jpg",
  "/images/photo_1_2026-04-01_22-25-06.jpg",
  "/images/pexels-photo-3065209.jpeg",
  "/images/pexels-photo-3998421.jpeg",
];

export const FAQS = [
  {
    id: 1,
    question: "Is parking available at your salon?",
    answer: "Yes! Free parking is available right outside our Ramtek location (near KITS College, Mauda Road). At our Nagardhan location on Killa Road, street parking is easily available nearby."
  },
  {
    id: 2,
    question: "Do you accept walk-in customers?",
    answer: "Absolutely! Walk-ins are always welcome. However, to ensure you get served quickly without waiting, we recommend booking your slot via WhatsApp in advance."
  },
  {
    id: 3,
    question: "What payment modes do you accept?",
    answer: "We accept Cash, UPI (GPay, PhonePe, Paytm), and all major Credit/Debit cards. No hassle — pay how you prefer."
  },
  {
    id: 4,
    question: "Do you offer services for women too?",
    answer: "Yes! UK HairXpresso is a fully unisex salon. We offer haircuts, coloring, hair spa, facials, manicure & pedicure for both men and women."
  },
  {
    id: 5,
    question: "How do I get the student discount?",
    answer: "Just carry your valid college or university ID card to the salon. Show it to our staff and you will automatically get 10% off on all services. Simple as that!"
  },
  {
    id: 6,
    question: "Do you do tattoos as well?",
    answer: "Yes! UK HairXpresso also houses a professional Tattoo Studio. Contact us via WhatsApp or visit the salon to discuss your tattoo design and pricing."
  },
  {
    id: 7,
    question: "How long does a typical appointment take?",
    answer: "A basic haircut takes 30–45 minutes. The Mid Package takes about 90 minutes. Larger packages like Pre-Grooming or Pro may take 2–3 hours. We recommend booking in advance for packages."
  },
  {
    id: 8,
    question: "What are your working hours?",
    answer: "We are open Monday to Saturday from 9:00 AM to 9:00 PM, and Sunday from 10:00 AM to 7:00 PM. Closed on major festivals — check WhatsApp for holiday updates."
  }
];
