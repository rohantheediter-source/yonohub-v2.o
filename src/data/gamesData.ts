import type { Game } from '../types/game';

/**
 * Mobile Games Data Repository
 * 
 * All previous sample games have been removed as requested.
 * You can add your own games to this array following the Game interface structure below.
 * 
 * Example game object to add:
 * {
 *   id: 'my-custom-game',
 *   slug: 'my-custom-game',
 *   title: 'My Custom Game',
 *   shortDescription: 'Exciting mobile adventure game for Android.',
 *   fullDescription: 'Detailed description of your game features, mechanics, and story.',
 *   category: 'Action', // 'All Games' | 'Popular Games' | 'New Releases' | 'Action' | 'Adventure' | 'Racing' | 'Strategy' | 'Arcade' | 'Puzzle'
 *   icon: 'https://example.com/icon.png',
 *   bannerImage: 'https://example.com/banner.png',
 *   screenshots: ['https://example.com/shot1.png', 'https://example.com/shot2.png'],
 *   fileSize: '150 MB',
 *   version: 'v1.0.0',
 *   rating: 4.8,
 *   reviewCount: '10K',
 *   downloads: '100K+',
 *   developer: 'My Studio Name',
 *   updatedDate: 'Oct 2026',
 *   minAndroid: 'Android 8.0+',
 *   packageName: 'com.mystudio.game',
 *   isPopular: true,
 *   isNew: true,
 *   isEditorsChoice: true,
 *   isOffline: true,
 *   tags: ['Action', 'Offline', 'Adventure'],
 *   features: ['HD Graphics', 'Offline Play', 'Smooth Controls'],
 *   whatsNew: 'Initial public launch release.',
 *   downloadUrl: 'https://example.com/download/game.apk',
 *   googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.mystudio.game'
 * }
 */
export const GAMES_DATA: Game[] = [];

export const CATEGORIES_LIST = [
  'All Games',
  'Popular Games',
  'New Releases',
  'Action',
  'Adventure',
  'Racing',
  'Strategy',
  'Arcade',
  'Puzzle',
] as const;
