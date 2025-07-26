import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Download, Share, RefreshCw, Edit, Save, X } from 'lucide-react';
import { CampaignData } from '@/types/campaign';
import CanvasEditor from './CanvasEditor';

interface PreviewPanelProps {
  campaignData: CampaignData;
  selectedTemplate: { id: string; name: string; style: string; imageUrl?: string };
  isVisible: boolean;
  onClose: () => void;
  onDownload: () => void;
  onPublish: () => void;
  onRegenerate: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  campaignData,
  selectedTemplate,
  isVisible,
  onClose,
  onDownload,
  onPublish,
  onRegenerate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(campaignData.description || '');
  const [editableTitle, setEditableTitle] = useState('Your Campaign');
  const [finalDesign, setFinalDesign] = useState<string | null>(null);

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

  const handleSaveEdits = () => {
    setIsEditing(false);
    // In a real app, you'd update the campaign data here
  };

  const handleCanvasSave = (dataUrl: string) => {
    setFinalDesign(dataUrl);
    setIsEditing(false);
  };

  const getTemplateImageUrl = () => {
    if (selectedTemplate.imageUrl) return selectedTemplate.imageUrl;
    // Construct URL from template ID for images in public folder
    return `/templates/${selectedTemplate.id}.png`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-background border-l border-border shadow-lg z-50 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Campaign Preview</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Preview */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              {isEditing ? (
                <Input 
                  value={editableTitle}
                  onChange={(e) => setEditableTitle(e.target.value)}
                  className="text-sm font-medium"
                />
              ) : (
                <CardTitle className="text-sm">{editableTitle}</CardTitle>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <Save className="w-3 h-3" /> : <Edit className="w-3 h-3" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {campaignData.platform?.replace(/_/g, ' ')} • {selectedTemplate.name}
            </p>
          </CardHeader>
          <CardContent className="pb-3">
            {finalDesign ? (
              <div className="flex justify-center">
                <img 
                  src={finalDesign} 
                  alt="Final campaign design"
                  className="max-w-full h-auto rounded border"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            ) : (
              <CanvasEditor
                templateImage={getTemplateImageUrl()}
                userImage={campaignData.image}
                dimensions={getDimensionsObject()}
                onSave={handleCanvasSave}
              />
            )}
          </CardContent>
        </Card>

        {/* Editable Content */}
        {isEditing && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Edit Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Text Content</label>
                <Textarea 
                  value={editableText}
                  onChange={(e) => setEditableText(e.target.value)}
                  placeholder="Enter your campaign text..."
                  className="mt-1"
                  rows={3}
                />
              </div>
              <Button onClick={handleSaveEdits} className="w-full" size="sm">
                <Save className="w-3 h-3 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Campaign Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {campaignData.tags && campaignData.tags.length > 0 && (
              <div>
                <span className="text-xs font-medium text-muted-foreground">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {campaignData.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {campaignData.targetAudience && (
              <div>
                <span className="text-xs font-medium text-muted-foreground">Target Audience:</span>
                <p className="text-xs text-muted-foreground mt-0.5">{campaignData.targetAudience}</p>
              </div>
            )}
            {campaignData.budget && (
              <div>
                <span className="text-xs font-medium text-muted-foreground">Budget:</span>
                <p className="text-xs text-muted-foreground mt-0.5">{campaignData.budget}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-2">
          {finalDesign ? (
            <>
              <Button onClick={onDownload} className="w-full" size="sm">
                <Download className="w-3 h-3 mr-2" />
                Download
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={onPublish} variant="outline" size="sm">
                  <Share className="w-3 h-3 mr-2" />
                  Publish
                </Button>
                <Button onClick={() => setFinalDesign(null)} variant="outline" size="sm">
                  <Edit className="w-3 h-3 mr-2" />
                  Edit More
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={onRegenerate} variant="outline" className="w-full" size="sm">
              <RefreshCw className="w-3 h-3 mr-2" />
              Regenerate Template
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;