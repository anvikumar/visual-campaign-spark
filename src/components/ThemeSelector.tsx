import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Target, Heart, Zap, Crown, Megaphone } from 'lucide-react';

interface ThemeSelectorProps {
  onSelect: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onSelect }) => {
  const themes = [
    { 
      id: 'luxury-launch', 
      title: 'Luxury Launch', 
      description: 'Premium, exclusive positioning for high-end products',
      icon: Crown,
      color: 'from-amber-500 to-orange-600'
    },
    { 
      id: 'brand-awareness', 
      title: 'Brand Awareness', 
      description: 'Build recognition and trust with your audience',
      icon: Megaphone,
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      id: 'high-conversion', 
      title: 'High Conversion', 
      description: 'Drive immediate sales and action',
      icon: Target,
      color: 'from-green-500 to-emerald-600'
    },
    { 
      id: 'lifestyle-inspiration', 
      title: 'Lifestyle Inspiration', 
      description: 'Aspirational content that inspires and motivates',
      icon: Heart,
      color: 'from-pink-500 to-rose-600'
    },
    { 
      id: 'product-showcase', 
      title: 'Product Showcase', 
      description: 'Highlight features and benefits beautifully',
      icon: Sparkles,
      color: 'from-purple-500 to-violet-600'
    },
    { 
      id: 'viral-moment', 
      title: 'Viral Moment', 
      description: 'Trend-worthy content designed to go viral',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {themes.map((theme) => (
        <Card 
          key={theme.id}
          className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary"
          onClick={() => onSelect(theme.title)}
        >
          <CardHeader className="pb-2">
            <div className={`w-8 h-8 bg-gradient-to-r ${theme.color} rounded-lg flex items-center justify-center mb-2`}>
              <theme.icon className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-sm">{theme.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">{theme.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ThemeSelector;