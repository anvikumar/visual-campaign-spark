import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlatformType } from '@/types/campaign';
import { Sparkles, Minimize, MessageSquare, Image, Type, Zap } from 'lucide-react';

interface TemplateSelectorProps {
  platform: PlatformType;
  customDimensions?: { width: number; height: number };
  onSelect: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ platform, customDimensions, onSelect }) => {
  const templates = [
    {
      id: 'hero-overlay',
      name: 'Hero Overlay',
      description: 'Bold text overlay on your image',
      icon: Type,
      preview: 'bg-gradient-to-br from-primary/20 to-creative/20'
    },
    {
      id: 'split-layout',
      name: 'Split Layout',
      description: 'Image on one side, content on the other',
      icon: Image,
      preview: 'bg-gradient-to-r from-primary/20 to-transparent'
    },
    {
      id: 'minimal-frame',
      name: 'Minimal Frame',
      description: 'Clean border with centered image',
      icon: Minimize,
      preview: 'bg-muted/20 border-2 border-dashed border-primary/30'
    },
    {
      id: 'testimonial-style',
      name: 'Testimonial Style',
      description: 'Quote bubble with your image',
      icon: MessageSquare,
      preview: 'bg-gradient-to-tl from-success/20 to-primary/20'
    },
    {
      id: 'product-showcase',
      name: 'Product Showcase',
      description: 'Feature highlights around your image',
      icon: Sparkles,
      preview: 'bg-gradient-to-br from-creative/20 to-primary/20'
    },
    {
      id: 'dynamic-burst',
      name: 'Dynamic Burst',
      description: 'Energetic design with motion elements',
      icon: Zap,
      preview: 'bg-gradient-to-br from-warning/20 to-creative/20'
    }
  ];

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

  return (
    <div className="mt-4 space-y-4">
      <div className="text-center p-3 bg-muted/20 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Templates optimized for <span className="font-medium text-primary">{platform.replace(/_/g, ' ')}</span>
        </p>
        <p className="text-xs text-muted-foreground">Dimensions: {getDimensions()}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary"
            onClick={() => onSelect(template.id)}
          >
            <CardHeader className="pb-2">
              <div className={`w-full h-16 ${template.preview} rounded-lg flex items-center justify-center mb-2 relative overflow-hidden`}>
                <template.icon className="w-6 h-6 text-primary" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
              </div>
              <CardTitle className="text-sm">{template.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;