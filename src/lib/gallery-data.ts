// Gallery data: free Unsplash images grouped by category.
export type Category = "Nature" | "Cities" | "Animals" | "Food";

export interface GalleryImage {
  id: number;
  title: string;
  category: Category;
  alt: string;
  /** Unsplash photo id */
  photo: string;
}

export const CATEGORIES: ("All" | Category)[] = ["All", "Nature", "Cities", "Animals", "Food"];

/** Build an Unsplash CDN URL at a given width. */
export const unsplash = (photo: string, w: number) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES: GalleryImage[] = [
  { id: 1, title: "Misty Mountains", category: "Nature", alt: "Fog rolling over green mountain ridges", photo: "photo-1506905925346-21bda4d32df4" },
  { id: 2, title: "Forest Light", category: "Nature", alt: "Sunlight streaming through tall forest trees", photo: "photo-1441974231531-c6227db76b6e" },
  { id: 3, title: "Calm Lake", category: "Nature", alt: "Still lake reflecting mountains at dawn", photo: "photo-1501785888041-af3ef285b470" },
  { id: 4, title: "Desert Dunes", category: "Nature", alt: "Golden sand dunes under a clear sky", photo: "photo-1509316785289-025f5b846b35" },
  { id: 5, title: "New York Nights", category: "Cities", alt: "Manhattan skyline lit up at night", photo: "photo-1496442226666-8d4d0e62e6e9" },
  { id: 6, title: "Tokyo Streets", category: "Cities", alt: "Neon-lit street in Tokyo", photo: "photo-1540959733332-eab4deabeeaf" },
  { id: 7, title: "Paris Rooftops", category: "Cities", alt: "Eiffel Tower above Paris rooftops", photo: "photo-1502602898657-3e91760cbb34" },
  { id: 8, title: "London Bridge", category: "Cities", alt: "Tower Bridge over the Thames in London", photo: "photo-1513635269975-59663e0ac1ad" },
  { id: 9, title: "Curious Fox", category: "Animals", alt: "Red fox sitting in the grass", photo: "photo-1474511320723-9a56873867b5" },
  { id: 10, title: "Sleepy Cat", category: "Animals", alt: "Cat resting with eyes half closed", photo: "photo-1514888286974-6c03e2ca1dba" },
  { id: 11, title: "Happy Dog", category: "Animals", alt: "Smiling golden dog outdoors", photo: "photo-1543466835-00a7907e9de1" },
  { id: 12, title: "Wild Lion", category: "Animals", alt: "Lion lying in the savanna", photo: "photo-1546182990-dffeafbe841d" },
  { id: 13, title: "Fresh Salad", category: "Food", alt: "Colorful healthy salad bowl", photo: "photo-1512621776951-a57141f2eefd" },
  { id: 14, title: "Pizza Night", category: "Food", alt: "Pizza with fresh basil on a table", photo: "photo-1513104890138-7c749659a591" },
  { id: 15, title: "Pancake Stack", category: "Food", alt: "Stack of pancakes with berries and syrup", photo: "photo-1567620905732-2d1ec7ab7445" },
  { id: 16, title: "Morning Coffee", category: "Food", alt: "Latte art in a ceramic cup", photo: "photo-1509042239860-f550ce710b93" },
];
