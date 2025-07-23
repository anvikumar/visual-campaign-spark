export const AdPlatformAndPlacementObject = {
  FACEBOOK_FEED: 'FACEBOOK_FEED',
  FACEBOOK_STORY: 'FACEBOOK_STORY',
  INSTAGRAM_FEED: 'INSTAGRAM_FEED',
  INSTAGRAM_STORY: 'INSTAGRAM_STORY',
  TIKTOK_FEED: 'TIKTOK_FEED',
  PINTEREST_PIN: 'PINTEREST_PIN',
  CUSTOM: 'CUSTOM',
  GOOGLE_MREC: 'GOOGLE_MREC',
  GOOGLE_LARGEREC: 'GOOGLE_LARGEREC',
  GOOGLE_LEADERBOARD: 'GOOGLE_LEADERBOARD',
  GOOGLE_HALFPAGE: 'GOOGLE_HALFPAGE',
  GOOGLE_LARGEMOBILE: 'GOOGLE_LARGEMOBILE',
  GOOGLE_SQUARE: 'GOOGLE_SQUARE',
  GOOGLE_LANDSCAPE: 'GOOGLE_LANDSCAPE',
  MAILCHIMP_BANNER: 'MAILCHIMP_BANNER',
  MAILCHIMP_LARGE_BANNER: 'MAILCHIMP_LARGE_BANNER',
  MAILCHIMP_MOBILE_BANNER: 'MAILCHIMP_MOBILE_BANNER',
  KLAVIYO_BANNER: 'KLAVIYO_BANNER',
  KLAVIYO_LARGE_BANNER: 'KLAVIYO_LARGE_BANNER',
  KLAVIYO_MOBILE_BANNER: 'KLAVIYO_MOBILE_BANNER',
  SHOPIFY_PRODUCT: 'SHOPIFY_PRODUCT',
  SHOPIFY_COLLECTION: 'SHOPIFY_COLLECTION',
  SHOPIFY_HERO: 'SHOPIFY_HERO'
} as const;

export type PlatformType = keyof typeof AdPlatformAndPlacementObject;

export interface CampaignData {
  image?: string;
  description?: string;
  tags?: string[];
  theme?: string;
  audience?: string;
  budget?: string;
  platform?: PlatformType;
  customDimensions?: { width: number; height: number };
  launchDate?: string;
  template?: string;
  headline?: string;
  bodyText?: string;
  cta?: string;
  targetAudience?: string;
  postTime?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  component?: React.ReactNode;
}

export interface TemplateDesign {
  id: string;
  name: string;
  platform: PlatformType[];
  dimensions: { width: number; height: number };
  preview: string;
}