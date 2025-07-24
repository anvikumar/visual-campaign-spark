import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlatformType } from '@/types/campaign';
import { Sparkles, Minimize, MessageSquare, Image, Type, Zap, RefreshCw } from 'lucide-react';
import TemplatePreview from './TemplatePreview';

interface TemplateSelectorProps {
  platform: PlatformType;
  customDimensions?: { width: number; height: number };
  userImage?: string;
  userText?: string;
  onSelect: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ platform, customDimensions, userImage, userText, onSelect }) => {
  const [currentSet, setCurrentSet] = useState(0);

  const templateSets = [
    [
      { id: 'hero-overlay', name: 'Hero Overlay', style: 'bold-text-overlay' },
      { id: 'split-layout', name: 'Split Layout', style: 'image-text-split' },
      { id: 'minimal-frame', name: 'Minimal Frame', style: 'clean-border' },
      { id: 'testimonial-style', name: 'Testimonial Style', style: 'quote-bubble' },
      { id: 'product-showcase', name: 'Product Showcase', style: 'feature-highlights' },
      { id: 'dynamic-burst', name: 'Dynamic Burst', style: 'motion-elements' }
    ],
    [
      { id: 'magazine-spread', name: 'Magazine Spread', style: 'editorial-layout' },
      { id: 'neon-glow', name: 'Neon Glow', style: 'vibrant-neon' },
      { id: 'vintage-poster', name: 'Vintage Poster', style: 'retro-aesthetic' },
      { id: 'geometric-modern', name: 'Geometric Modern', style: 'sharp-angles' },
      { id: 'watercolor-artistic', name: 'Watercolor Artistic', style: 'soft-artistic' },
      { id: 'tech-futuristic', name: 'Tech Futuristic', style: 'sci-fi-modern' }
    ]
  ];

  const currentTemplates = templateSets[currentSet];

  const getDimensions = () => {
    if (customDimensions) return `${customDimensions.width}x${customDimensions.height}`;
    
    const dimensionMap: Record<string, string> = {
      'FACEBOOK_FEED': '1200x630',
      'FACEBOOK_STORY': '1080x1920',
      'INSTAGRAM_FEED': '1080x1080',
      'INSTAGRAM_STORY': '1080x1920',
      'TIKTOK_FEED': '1080x1920',
      'PINTEREST_PIN': '1000x1500',
      'GOOGLE_MREC': '300x250',
      'GOOGLE_LEADERBOARD': '728x90',
      'GOOGLE_SQUARE': '250x250',
      'MAILCHIMP_BANNER': '600x300',
      'SHOPIFY_HERO': '1920x600',
    };
    
    return dimensionMap[platform] || '800x600';
  };

  const getDimensionsObject = () => {
    if (customDimensions) return customDimensions;
    
    const dimensionMap: Record<string, { width: number; height: number }> = {
      'FACEBOOK_FEED': { width: 1200, height: 630 },
      'FACEBOOK_STORY': { width: 1080, height: 1920 },
      'INSTAGRAM_FEED': { width: 1080, height: 1080 },
      'INSTAGRAM_STORY': { width: 1080, height: 1920 },
      'TIKTOK_FEED': { width: 1080, height: 1920 },
      'PINTEREST_PIN': { width: 1000, height: 1500 },
      'GOOGLE_MREC': { width: 300, height: 250 },
      'GOOGLE_LEADERBOARD': { width: 728, height: 90 },
      'GOOGLE_SQUARE': { width: 250, height: 250 },
      'MAILCHIMP_BANNER': { width: 600, height: 300 },
      'SHOPIFY_HERO': { width: 1920, height: 600 },
    };
    
    return dimensionMap[platform] || { width: 800, height: 600 };
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="text-center p-3 bg-muted/20 rounded-lg">
        <p className="text-sm text-muted-foreground">
          AI-suggested templates for <span className="font-medium text-primary">{platform.replace(/_/g, ' ')}</span>
        </p>
        <p className="text-xs text-muted-foreground">Dimensions: {getDimensions()}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {currentTemplates.map((template) => (
          <Card 
            key={template.id}
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary overflow-hidden"
            onClick={() => onSelect(template.id)}
          >
            <CardHeader className="pb-2">
              <TemplatePreview 
                template={template}
                userImage={userImage}
                userText={userText}
                dimensions={getDimensionsObject()}
              />
              <CardTitle className="text-sm mt-2">{template.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {currentSet < templateSets.length - 1 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setCurrentSet(prev => prev + 1)}
            className="w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Show More Templates
          </Button>
        </div>
      )}

      {currentSet > 0 && (
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentSet(0)}
            className="text-sm"
          >
            Back to First Set
          </Button>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;