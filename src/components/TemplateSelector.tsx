import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlatformType } from '@/types/campaign';
import { Sparkles, Minimize, MessageSquare, Image, Type, Zap, RefreshCw } from 'lucide-react';
import TemplatePreview from './TemplatePreview';
import { TemplateCrawlerService } from '@/services/templateCrawler';
import { OpenAIService } from '@/services/openai';
import { useToast } from '@/components/ui/use-toast';

interface TemplateSelectorProps {
  platform: PlatformType;
  customDimensions?: { width: number; height: number };
  userImage?: string;
  userText?: string;
  extractedThemes?: any;
  onSelect: (templateId: string, templateData: any) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  platform, 
  customDimensions, 
  userImage, 
  userText, 
  extractedThemes, 
  onSelect 
}) => {
  const [currentSet, setCurrentSet] = useState(0);
  const [aiRecommendedTemplates, setAiRecommendedTemplates] = useState<any[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const { toast } = useToast();

  // Get templates from crawler service
  const allTemplates = TemplateCrawlerService.getTemplatesForPlatform(platform);
  
  // Convert to the format expected by the component
  const availableTemplates = allTemplates.map(t => ({
    id: t.id,
    name: t.name,
    style: t.style
  }));

  useEffect(() => {
    if (extractedThemes && availableTemplates.length > 0) {
      loadAIRecommendations();
    }
  }, [extractedThemes, platform]);

  const loadAIRecommendations = async () => {
    if (!extractedThemes) return;
    
    setIsLoadingRecommendations(true);
    try {
      const recommendations = await OpenAIService.recommendTemplates(
        platform,
        extractedThemes,
        availableTemplates
      );
      setAiRecommendedTemplates(recommendations);
    } catch (error) {
      console.error('Failed to get AI recommendations:', error);
      toast({
        title: "AI Recommendations Unavailable",
        description: "Showing all available templates instead.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  // Use AI recommendations if available, otherwise fall back to chunks of available templates
  const getDisplayTemplates = () => {
    if (aiRecommendedTemplates.length > 0) {
      const startIndex = currentSet * 6;
      return aiRecommendedTemplates.slice(startIndex, startIndex + 6).map(rec => ({
        id: rec.templateId,
        name: rec.templateName,
        style: rec.description,
        aiScore: rec.suitabilityScore,
        reasoning: rec.reasoning
      }));
    }
    
    // Fallback to chunked available templates
    const chunkSize = 6;
    const startIndex = currentSet * chunkSize;
    return availableTemplates.slice(startIndex, startIndex + chunkSize);
  };

  const currentTemplates = getDisplayTemplates();

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
          {aiRecommendedTemplates.length > 0 ? 'AI-Recommended Templates' : 'Available Templates'} for <span className="font-medium text-primary">{platform.replace(/_/g, ' ')}</span>
        </p>
        <p className="text-xs text-muted-foreground">Dimensions: {getDimensions()}</p>
        {isLoadingRecommendations && (
          <p className="text-xs text-primary mt-1">🤖 AI is analyzing the best templates for your image...</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {currentTemplates.map((template) => (
          <Card 
            key={template.id}
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary overflow-hidden"
            onClick={() => onSelect(template.id, template)}
          >
            <CardHeader className="pb-2">
              <TemplatePreview 
                template={template}
                userImage={userImage}
                userText={userText}
                dimensions={getDimensionsObject()}
              />
              <div className="flex items-center justify-between mt-2">
                <CardTitle className="text-sm">{template.name}</CardTitle>
                {template.aiScore && (
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                    {template.aiScore}/10
                  </span>
                )}
              </div>
              {template.reasoning && (
                <p className="text-xs text-primary/70 italic mt-1">{template.reasoning}</p>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>

      {(() => {
        const hasMoreTemplates = aiRecommendedTemplates.length > 0 
          ? (currentSet + 1) * 6 < aiRecommendedTemplates.length
          : (currentSet + 1) * 6 < availableTemplates.length;
        
        return hasMoreTemplates && (
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
        );
      })()}

      {currentSet > 0 && (
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentSet(0)}
            className="text-sm"
          >
            Back to Top Recommendations
          </Button>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;