export interface CafeReview {
  id: string;
  name: string;
  neighborhood: string;
  rating: number; // out of 5.0
  reviewCount: number;
  priceForTwo: string;
  vibe: string;
  subScores: {
    coffee: number;
    ambience: number;
    workFriendly: number;
    value: number;
  };
  signatureMustOrders: string[];
  description: string;
  editorialVerdict: string;
  instagramFeaturedUrl: string;
  instagramHandle: string;
  tags: string[];
}

export const INSTAGRAM_URL = "https://www.instagram.com/bitsofbombae?stkn=MTIybXJqOTlpZDB5eQ==";
export const INSTAGRAM_HANDLE = "@bitsofbombae";
export const CONTACT_EMAIL = "contact@bitsofbombae.com";

export const CAFES_RATINGS_DATA: CafeReview[] = [
  {
    id: "subko-bandra",
    name: "Subko Specialty Coffee & Craft Bakehouse",
    neighborhood: "Ranwar Village, Bandra West",
    rating: 4.9,
    reviewCount: 342,
    priceForTwo: "₹800 – ₹1,100",
    vibe: "Converted 19th-century Portuguese cottage, rustic teakwood, artisanal craft roastery",
    subScores: {
      coffee: 5.0,
      ambience: 4.9,
      workFriendly: 4.6,
      value: 4.5,
    },
    signatureMustOrders: [
      "Iced Lavender Cold Brew",
      "Podi Sourdough Toast",
      "Bloom Single-Origin Pour Over",
      "Twice-Baked Almond Cruffin"
    ],
    description: "Tucked inside the narrow, mural-splashed alleys of Ranwar, Subko reimagined Indian specialty coffee. Every batch is roasted from small-batch beans across the subcontinent.",
    editorialVerdict: "The gold standard for third-wave coffee in Bombay. Go early on weekday mornings to snag a table near the glass brew-bar.",
    instagramFeaturedUrl: INSTAGRAM_URL,
    instagramHandle: "@bitsofbombae",
    tags: ["Specialty Coffee", "Bakehouse", "Bandra", "Aesthetic", "Work-Friendly"]
  },
  {
    id: "kala-ghoda-cafe",
    name: "Kala Ghoda Café & Wine Bar",
    neighborhood: "Ropewalk Lane, Fort",
    rating: 4.8,
    reviewCount: 289,
    priceForTwo: "₹700 – ₹1,000",
    vibe: "Heritage barn architecture, vaulted wooden rafters, intimate art-district hideout",
    subScores: {
      coffee: 4.8,
      ambience: 4.9,
      workFriendly: 4.7,
      value: 4.6,
    },
    signatureMustOrders: [
      "Dark Chocolate Belgian Waffle",
      "Double Shot Cortado",
      "Mushroom & Thyme Melt",
      "Fresh Almond Croissant"
    ],
    description: "An icon of South Bombay's art district. Bathed in amber light with cozy corners, it brings together gallery visitors, architects, and writers nursing espressos.",
    editorialVerdict: "Unbeatable South Bombay charm. Ideal for thoughtful afternoon conversations and rainy-day reading.",
    instagramFeaturedUrl: INSTAGRAM_URL,
    instagramHandle: "@bitsofbombae",
    tags: ["Heritage", "Art District", "Fort", "Espresso Bar", "Cozy"]
  },
  {
    id: "candies-pali-hill",
    name: "Candies at Mac Ronells",
    neighborhood: "Pali Hill, Bandra West",
    rating: 4.7,
    reviewCount: 512,
    priceForTwo: "₹450 – ₹650",
    vibe: "Sprawling multi-tier Portuguese villa, mosaic courtyards, college student sanctuary",
    subScores: {
      coffee: 4.3,
      ambience: 5.0,
      workFriendly: 4.8,
      value: 5.0,
    },
    signatureMustOrders: [
      "Macaroni & Cheese Salad",
      "Cold Coffee with Ice Cream",
      "Mutton Pan Roll",
      "Pink Lemonade & Cupcakes"
    ],
    description: "The sentimental campus capital of suburban Bombay. With winding terracotta terraces, retro lamps, and unhurried courtyard tables, it has nourished college friendships for decades.",
    editorialVerdict: "Best value-for-money hangout in Bandra. You can sit with your college notes for hours without anyone rushing you.",
    instagramFeaturedUrl: INSTAGRAM_URL,
    instagramHandle: "@bitsofbombae",
    tags: ["College Favorite", "Budget Friendly", "Pali Hill", "Terrace", "Nostalgic"]
  },
  {
    id: "kcr-khar",
    name: "Koinonia Coffee Roasters (KCR)",
    neighborhood: "Chuim Village, Khar West",
    rating: 4.8,
    reviewCount: 198,
    priceForTwo: "₹500 – ₹750",
    vibe: "Intimate neighborhood village roastery, warm concrete benches, vinyl acoustics",
    subScores: {
      coffee: 5.0,
      ambience: 4.7,
      workFriendly: 4.8,
      value: 4.7,
    },
    signatureMustOrders: [
      "Cascara Sparkling Tonic",
      "Oat Milk Flat White",
      "Gooey Sea-Salt Chocolate Cookie",
      "Aeropress Estate Lot #4"
    ],
    description: "A secret sanctuary in Chuim village where the air smells of freshly cracked Arabica. Minimalist, focused, and free from pompous distractions.",
    editorialVerdict: "For serious coffee lovers who value extraction precision over flamboyant decor.",
    instagramFeaturedUrl: INSTAGRAM_URL,
    instagramHandle: "@bitsofbombae",
    tags: ["Roastery", "Village Gem", "Khar", "Minimalist", "Top Brews"]
  },
  {
    id: "prithvi-cafe-juhu",
    name: "Prithvi Café",
    neighborhood: "Janki Kutir, Juhu",
    rating: 4.9,
    reviewCount: 620,
    priceForTwo: "₹400 – ₹600",
    vibe: "Canopy of hanging fairy lights, bamboo foliage, theater artists & literary crowd",
    subScores: {
      coffee: 4.6,
      ambience: 5.0,
      workFriendly: 4.6,
      value: 4.9,
    },
    signatureMustOrders: [
      "Cardamom Sulemani Chai",
      "Warm Irish Coffee",
      "Stuffed Aloo & Cheese Paratha",
      "Warm Apple Cinnamon Cake"
    ],
    description: "Adjoining the iconic Prithvi Theatre, this breezy outdoor courtyard is the spiritual home of Bombay's performing artists, scriptwriters, and late-night thinkers.",
    editorialVerdict: "Electric bohemian soul. Order the cutting Sulemani chai and absorb the creative hum.",
    instagramFeaturedUrl: INSTAGRAM_URL,
    instagramHandle: "@bitsofbombae",
    tags: ["Theater", "Juhu", "Fairy Lights", "Sulemani Chai", "Iconic"]
  },
  {
    id: "bake-house-cafe",
    name: "Bake House Café",
    neighborhood: "Kala Ghoda, Fort",
    rating: 4.7,
    reviewCount: 245,
    priceForTwo: "₹900 – ₹1,200",
    vibe: "Exposed brick masonry, vintage brass chandeliers, plush deep-leather booths",
    subScores: {
      coffee: 4.6,
      ambience: 4.9,
      workFriendly: 4.5,
      value: 4.5,
    },
    signatureMustOrders: [
      "Pull-Apart Cheesy Garlic Bread",
      "Sea Salt Mocha",
      "Truffle Parmesan Fries",
      "Layered Spiced Carrot Cake"
    ],
    description: "An elegant European-style bistro housed inside an old colonial warehouse frame, offering hearty comfort food alongside rich espresso beverages.",
    editorialVerdict: "Perfect for date evenings and celebratory college lunches after visiting nearby museums.",
    instagramFeaturedUrl: INSTAGRAM_URL,
    instagramHandle: "@bitsofbombae",
    tags: ["Bistro", "Heritage", "Kala Ghoda", "Desserts", "Evening Mood"]
  },
  {
    id: "blue-tokai-versova",
    name: "Blue Tokai Coffee Roasters",
    neighborhood: "Yari Road, Versova",
    rating: 4.8,
    reviewCount: 310,
    priceForTwo: "₹650 – ₹900",
    vibe: "Sunlit coastal glass facade, indoor plants, filmmakers & digital creators hub",
    subScores: {
      coffee: 4.9,
      ambience: 4.7,
      workFriendly: 4.9,
      value: 4.6,
    },
    signatureMustOrders: [
      "Vietnamese Iced Coffee",
      "Smoked Sourdough Toasties",
      "Dark Chocolate Sea Salt Cruffin",
      "Cold Brew Tonic"
    ],
    description: "Versova's favorite remote working hub. Fast Wi-Fi, abundant charging sockets, and consistently dialled-in Indian single origins.",
    editorialVerdict: "The best daytime workstation for laptops, script writing, and uninterrupted productivity.",
    instagramFeaturedUrl: INSTAGRAM_URL,
    instagramHandle: "@bitsofbombae",
    tags: ["Work Station", "Versova", "Fast Wi-Fi", "Cold Brew", "Coastal"]
  },
  {
    id: "kyani-and-co",
    name: "Kyani & Co. (Heritage Irani)",
    neighborhood: "Marine Lines, South Bombay",
    rating: 4.8,
    reviewCount: 840,
    priceForTwo: "₹200 – ₹350",
    vibe: "1904 vintage time capsule, bentwood Austrian chairs, whirring cast-iron fans",
    subScores: {
      coffee: 4.4, // Chai is 5.0
      ambience: 4.9,
      workFriendly: 4.2,
      value: 5.0,
    },
    signatureMustOrders: [
      "Brun Maska dipped in Sweet Chai",
      "Fresh Mawa Cake",
      "Chicken Parsi Patties",
      "Caramel Custard"
    ],
    description: "Bombay's oldest operational Irani cafe. Stained mirrors, wooden check counters, and the unchanged rhythm of dipping crisp brun maska into sweet cardamomy chai.",
    editorialVerdict: "An indispensable cultural rite of passage. No visit to Bombay is complete without breakfast here.",
    instagramFeaturedUrl: INSTAGRAM_URL,
    instagramHandle: "@bitsofbombae",
    tags: ["Irani Heritage", "Since 1904", "Marine Lines", "Brun Maska", "Historic"]
  }
];
