export type Theme = 'light' | 'dark';

export type GameCategory =
  | 'All Games'
  | 'Popular Games'
  | 'New Releases'
  | 'Rummy'
  | 'Slots'
  | 'Arcade'
  | 'Strategy'
  | 'Action'
  | 'Adventure'
  | 'Racing'
  | 'Puzzle';

export interface Game {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: GameCategory;
  subCategory?: string;
  icon: string;
  bannerImage: string;
  screenshots: string[];
  fileSize: string;
  version: string;
  rating: number;
  reviewCount: string;
  downloads: string;
  developer: string;
  updatedDate: string;
  minAndroid: string;
  packageName: string;
  isPopular?: boolean;
  isNew?: boolean;
  isEditorsChoice?: boolean;
  isOffline?: boolean;
  tags: string[];
  features: string[];
  whatsNew?: string;
  downloadUrl: string;
  googlePlayUrl: string;
}

export interface FilterState {
  category: GameCategory;
  searchQuery: string;
  sortBy: 'popular' | 'rating' | 'newest' | 'size';
  offlineOnly: boolean;
  editorsChoiceOnly: boolean;
}
