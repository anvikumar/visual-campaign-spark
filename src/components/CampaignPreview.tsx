import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share, RefreshCw, Edit } from 'lucide-react';
import { CampaignData } from '@/types/campaign';
import TemplatePreview from './TemplatePreview';

interface CampaignPreviewProps {
  campaignData: CampaignData;
  onDownload: () => void;
  onPublish: () => void;
  onRegenerate: () => void;
  onEdit: () => void;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({
  campaignData,
  onDownload,
  onPublish,
  onRegenerate,
  onEdit
}) => {
  const getDimensionsObject = () => {
    if (campaignData.customDimensions) return campaignData.customDimensions;
    
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
    
    return dimensionMap[campaignData.platform!] || { width: 800, height: 600 };
  };

  return (
    <div className="mt-4 space-y-6">
      {/* Campaign Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Campaign Design</CardTitle>
          <p className="text-sm text-muted-foreground">
            {campaignData.platform?.replace(/_/g, ' ')} • {campaignData.theme} Theme
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="scale-110">
            <TemplatePreview 
              template={{
                id: campaignData.template!,
                name: '',
                style: ''
              }}
              userImage={campaignData.image}
              userText={campaignData.description}
              dimensions={getDimensionsObject()}
            />
          </div>
        </CardContent>
      </Card>

      {/* Campaign Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Campaign Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {campaignData.description && (
            <div>
              <span className="font-medium text-sm">Description:</span>
              <p className="text-sm text-muted-foreground">{campaignData.description}</p>
            </div>
          )}
          {campaignData.tags && campaignData.tags.length > 0 && (
            <div>
              <span className="font-medium text-sm">Tags:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {campaignData.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {campaignData.targetAudience && (
            <div>
              <span className="font-medium text-sm">Target Audience:</span>
              <p className="text-sm text-muted-foreground">{campaignData.targetAudience}</p>
            </div>
          )}
          {campaignData.budget && (
            <div>
              <span className="font-medium text-sm">Budget:</span>
              <p className="text-sm text-muted-foreground">{campaignData.budget}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={onDownload} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button onClick={onPublish} variant="outline" className="w-full">
          <Share className="w-4 h-4 mr-2" />
          Publish
        </Button>
        <Button onClick={onRegenerate} variant="outline" className="w-full">
          <RefreshCw className="w-4 h-4 mr-2" />
          Regenerate
        </Button>
        <Button onClick={onEdit} variant="ghost" className="w-full">
          <Edit className="w-4 h-4 mr-2" />
          Edit Details
        </Button>
      </div>
    </div>
  );
};

export default CampaignPreview;