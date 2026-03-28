export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Aura Wireless Headphones",
    price: 299,
    category: "Electronics",
    image: "https://picsum.photos/seed/headphones/600/600",
    description: "Premium noise-canceling headphones with spatial audio."
  },
  {
    id: 2,
    name: "Vortex Smart Watch",
    price: 199,
    category: "Electronics",
    image: "https://picsum.photos/seed/watch/600/600",
    description: "Track your health and stay connected with style."
  },
  {
    id: 3,
    name: "Nebula Mechanical Keyboard",
    price: 159,
    category: "Accessories",
    image: "https://picsum.photos/seed/keyboard/600/600",
    description: "Tactile feedback and RGB lighting for the ultimate setup."
  },
  {
    id: 4,
    name: "Zenith Minimalist Backpack",
    price: 89,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/backpack/600/600",
    description: "Durable, water-resistant, and perfect for daily commute."
  },
  {
    id: 5,
    name: "Titanium Water Bottle",
    price: 45,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/bottle/600/600",
    description: "Keep your drinks at the perfect temperature for 24 hours."
  },
  {
    id: 6,
    name: "Solaris Desk Lamp",
    price: 79,
    category: "Home",
    image: "https://picsum.photos/seed/lamp/600/600",
    description: "Adjustable brightness and color temperature for focus."
  },
  {
    id: 7,
    name: "Eclipse Gaming Mouse",
    price: 69,
    category: "Accessories",
    image: "https://picsum.photos/seed/mouse/600/600",
    description: "Ultra-lightweight with high-precision sensor."
  },
  {
    id: 8,
    name: "Horizon Bluetooth Speaker",
    price: 129,
    category: "Electronics",
    image: "https://picsum.photos/seed/speaker/600/600",
    description: "Powerful sound in a compact, portable design."
  }
];
