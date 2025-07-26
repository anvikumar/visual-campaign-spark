interface CrawledTemplate {
  id: string;
  name: string;
  style: string;
  imageUrl?: string;
  platform: string;
  category: string;
  source: string;
}

export class TemplateCrawlerService {
  
  // Expanded template library with more realistic design options
  static getAllTemplates(): CrawledTemplate[] {
    return [
      // Instagram Feed Templates
      { id: 'modern-minimal', name: 'Modern Minimal', style: 'Clean, minimal design with bold typography', platform: 'INSTAGRAM_FEED', category: 'minimal', source: 'internal', imageUrl: '/templates/modern-minimal.png' },
      { id: 'vibrant-gradient', name: 'Vibrant Gradient', style: 'Colorful gradient backgrounds with dynamic elements', platform: 'INSTAGRAM_FEED', category: 'colorful', source: 'internal', imageUrl: '/templates/vibrant-gradient.png' },
      { id: 'product-showcase', name: 'Product Showcase', style: 'Professional product display with pricing', platform: 'INSTAGRAM_FEED', category: 'ecommerce', source: 'internal', imageUrl: '/templates/product-showcase.png' },
      { id: 'lifestyle-story', name: 'Lifestyle Story', style: 'Authentic lifestyle photography layout', platform: 'INSTAGRAM_FEED', category: 'lifestyle', source: 'internal' },
      { id: 'brand-announcement', name: 'Brand Announcement', style: 'Bold announcement design with call-to-action', platform: 'INSTAGRAM_FEED', category: 'promotional', source: 'internal' },
      { id: 'user-testimonial', name: 'User Testimonial', style: 'Social proof template with customer quotes', platform: 'INSTAGRAM_FEED', category: 'testimonial', source: 'internal' },
      
      // Instagram Story Templates  
      { id: 'story-poll', name: 'Interactive Poll', style: 'Engaging poll template with custom graphics', platform: 'INSTAGRAM_STORY', category: 'interactive', source: 'internal', imageUrl: '/templates/story-poll.png' },
      { id: 'story-tutorial', name: 'Tutorial Steps', style: 'Step-by-step tutorial layout', platform: 'INSTAGRAM_STORY', category: 'educational', source: 'internal', imageUrl: '/templates/story-tutorial.png' },
      { id: 'story-behind-scenes', name: 'Behind the Scenes', style: 'Casual behind-the-scenes template', platform: 'INSTAGRAM_STORY', category: 'lifestyle', source: 'internal' },
      { id: 'story-promotion', name: 'Flash Sale', style: 'Urgent promotional design with countdown', platform: 'INSTAGRAM_STORY', category: 'promotional', source: 'internal' },
      
      // Facebook Templates
      { id: 'facebook-event', name: 'Event Announcement', style: 'Professional event promotion layout', platform: 'FACEBOOK_FEED', category: 'event', source: 'internal' },
      { id: 'facebook-community', name: 'Community Post', style: 'Engaging community discussion starter', platform: 'FACEBOOK_FEED', category: 'community', source: 'internal' },
      { id: 'facebook-video-cover', name: 'Video Thumbnail', style: 'Eye-catching video cover design', platform: 'FACEBOOK_FEED', category: 'video', source: 'internal' },
      
      // TikTok Templates
      { id: 'tiktok-challenge', name: 'Challenge Template', style: 'Trendy challenge participation design', platform: 'TIKTOK_FEED', category: 'trending', source: 'internal' },
      { id: 'tiktok-tutorial', name: 'Quick Tutorial', style: 'Fast-paced tutorial template', platform: 'TIKTOK_FEED', category: 'educational', source: 'internal' },
      { id: 'tiktok-comedy', name: 'Comedy Skit', style: 'Humorous content template', platform: 'TIKTOK_FEED', category: 'entertainment', source: 'internal' },
      
      // Pinterest Templates
      { id: 'pinterest-diy', name: 'DIY Guide', style: 'Step-by-step DIY project layout', platform: 'PINTEREST_PIN', category: 'diy', source: 'internal' },
      { id: 'pinterest-recipe', name: 'Recipe Card', style: 'Beautiful recipe presentation', platform: 'PINTEREST_PIN', category: 'food', source: 'internal' },
      { id: 'pinterest-quote', name: 'Inspirational Quote', style: 'Motivational quote with beautiful typography', platform: 'PINTEREST_PIN', category: 'inspirational', source: 'internal' },
      { id: 'pinterest-infographic', name: 'Info Graphics', style: 'Data visualization template', platform: 'PINTEREST_PIN', category: 'educational', source: 'internal' },
      
      // Google Ads Templates
      { id: 'google-cta', name: 'Call to Action', style: 'High-converting CTA design', platform: 'GOOGLE_MREC', category: 'promotional', source: 'internal' },
      { id: 'google-brand', name: 'Brand Awareness', style: 'Professional brand showcase', platform: 'GOOGLE_LEADERBOARD', category: 'branding', source: 'internal' },
      
      // Email/Mailchimp Templates
      { id: 'email-newsletter', name: 'Newsletter Header', style: 'Professional newsletter design', platform: 'MAILCHIMP_BANNER', category: 'newsletter', source: 'internal' },
      { id: 'email-promotion', name: 'Promotional Banner', style: 'Sales and promotion template', platform: 'MAILCHIMP_BANNER', category: 'promotional', source: 'internal' },
      
      // Shopify Templates
      { id: 'shopify-hero', name: 'Hero Banner', style: 'High-impact hero section design', platform: 'SHOPIFY_HERO', category: 'ecommerce', source: 'internal' },
      { id: 'shopify-collection', name: 'Collection Showcase', style: 'Product collection display', platform: 'SHOPIFY_HERO', category: 'ecommerce', source: 'internal' },
    ];
  }

  static getTemplatesForPlatform(platform: string): CrawledTemplate[] {
    return this.getAllTemplates().filter(template => template.platform === platform);
  }

  static getTemplatesByCategory(category: string): CrawledTemplate[] {
    return this.getAllTemplates().filter(template => template.category === category);
  }

  static searchTemplates(query: string): CrawledTemplate[] {
    const searchTerm = query.toLowerCase();
    return this.getAllTemplates().filter(template =>
      template.name.toLowerCase().includes(searchTerm) ||
      template.style.toLowerCase().includes(searchTerm) ||
      template.category.toLowerCase().includes(searchTerm)
    );
  }

  // Future: Implement actual web crawling
  static async crawlCanvaTemplates(platform: string): Promise<CrawledTemplate[]> {
    // This would crawl actual Canva templates in a real implementation
    // For now, return our curated templates
    return this.getTemplatesForPlatform(platform);
  }
}