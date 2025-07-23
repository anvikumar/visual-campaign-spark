import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdPlatformAndPlacementObject } from '@/types/campaign';
import { 
  Facebook, 
  Instagram, 
  Chrome, 
  Mail, 
  ShoppingBag, 
  Monitor,
  Smartphone,
  Settings
} from 'lucide-react';

interface PlatformSelectorProps {
  onSelect: (platform: string, customDimensions?: { width: number; height: number }) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ onSelect }) => {
  const [showCustom, setShowCustom] = useState(false);
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');

  const platforms = [
    // Social Media
    { id: 'FACEBOOK_FEED', name: 'Facebook Feed', icon: Facebook, category: 'Social Media', color: 'from-blue-600 to-blue-700' },
    { id: 'FACEBOOK_STORY', name: 'Facebook Story', icon: Facebook, category: 'Social Media', color: 'from-blue-600 to-blue-700' },
    { id: 'INSTAGRAM_FEED', name: 'Instagram Feed', icon: Instagram, category: 'Social Media', color: 'from-pink-500 to-purple-600' },
    { id: 'INSTAGRAM_STORY', name: 'Instagram Story', icon: Instagram, category: 'Social Media', color: 'from-pink-500 to-purple-600' },
    { id: 'TIKTOK_FEED', name: 'TikTok Feed', icon: Smartphone, category: 'Social Media', color: 'from-black to-gray-800' },
    { id: 'PINTEREST_PIN', name: 'Pinterest Pin', icon: Monitor, category: 'Social Media', color: 'from-red-500 to-red-600' },
    
    // Google Ads
    { id: 'GOOGLE_MREC', name: 'Google MREC (300x250)', icon: Chrome, category: 'Google Ads', color: 'from-green-500 to-green-600' },
    { id: 'GOOGLE_LEADERBOARD', name: 'Google Leaderboard (728x90)', icon: Chrome, category: 'Google Ads', color: 'from-green-500 to-green-600' },
    { id: 'GOOGLE_SQUARE', name: 'Google Square (250x250)', icon: Chrome, category: 'Google Ads', color: 'from-green-500 to-green-600' },
    
    // Email Marketing
    { id: 'MAILCHIMP_BANNER', name: 'Mailchimp Banner', icon: Mail, category: 'Email Marketing', color: 'from-yellow-500 to-orange-500' },
    { id: 'KLAVIYO_BANNER', name: 'Klaviyo Banner', icon: Mail, category: 'Email Marketing', color: 'from-indigo-500 to-purple-600' },
    
    // E-commerce
    { id: 'SHOPIFY_PRODUCT', name: 'Shopify Product', icon: ShoppingBag, category: 'E-commerce', color: 'from-green-600 to-teal-600' },
    { id: 'SHOPIFY_HERO', name: 'Shopify Hero', icon: ShoppingBag, category: 'E-commerce', color: 'from-green-600 to-teal-600' },
  ];

  const categories = Array.from(new Set(platforms.map(p => p.category)));

  const handleCustomSubmit = () => {
    const width = parseInt(customWidth);
    const height = parseInt(customHeight);
    if (width > 0 && height > 0) {
      onSelect('CUSTOM', { width, height });
    }
  };

  if (showCustom) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Custom Dimensions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="width">Width (px)</Label>
              <Input
                id="width"
                type="number"
                placeholder="800"
                value={customWidth}
                onChange={(e) => setCustomWidth(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="height">Height (px)</Label>
              <Input
                id="height"
                type="number"
                placeholder="600"
                value={customHeight}
                onChange={(e) => setCustomHeight(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCustomSubmit} className="flex-1">
              Create Custom
            </Button>
            <Button variant="outline" onClick={() => setShowCustom(false)}>
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {categories.map(category => (
        <div key={category}>
          <h4 className="font-medium text-sm text-muted-foreground mb-2">{category}</h4>
          <div className="grid grid-cols-2 gap-2">
            {platforms
              .filter(p => p.category === category)
              .map((platform) => (
                <Card 
                  key={platform.id}
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border hover:border-primary"
                  onClick={() => onSelect(platform.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 bg-gradient-to-r ${platform.color} rounded flex items-center justify-center`}>
                        <platform.icon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-medium">{platform.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
      
      <Button 
        variant="outline" 
        onClick={() => setShowCustom(true)}
        className="w-full"
      >
        <Settings className="w-4 h-4 mr-2" />
        Custom Dimensions
      </Button>
    </div>
  );
};

export default PlatformSelector;