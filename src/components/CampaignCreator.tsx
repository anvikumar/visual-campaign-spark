import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Camera, Sparkles, Target, Calendar, DollarSign, Share2, Download, Edit, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type CampaignStep = 'upload' | 'analyze' | 'theme' | 'details' | 'template' | 'preview' | 'export';

interface CampaignData {
  image?: string;
  description?: string;
  tags?: string[];
  theme?: string;
  audience?: string;
  budget?: string;
  platform?: string;
  launchDate?: string;
  template?: string;
  headline?: string;
  bodyText?: string;
  cta?: string;
  targetAudience?: string;
  postTime?: string;
}

const CampaignCreator = () => {
  const [currentStep, setCurrentStep] = useState<CampaignStep>('upload');
  const [campaignData, setCampaignData] = useState<CampaignData>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setCampaignData(prev => ({ ...prev, image: imageUrl }));
        setIsAnalyzing(true);
        
        // Simulate image analysis
        setTimeout(() => {
          const mockTags = ['lifestyle', 'premium', 'modern', 'elegant', 'youthful'];
          const mockDescription = 'A beautifully composed image showcasing modern lifestyle elements with clean, elegant aesthetics.';
          
          setCampaignData(prev => ({
            ...prev,
            tags: mockTags,
            description: mockDescription
          }));
          setIsAnalyzing(false);
          setCurrentStep('theme');
          toast({
            title: "Image analyzed successfully!",
            description: "Ready to create your campaign theme."
          });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  }, [toast]);

  const handleThemeSelect = (theme: string) => {
    setCampaignData(prev => ({ ...prev, theme }));
    setCurrentStep('details');
  };

  const handleTemplateSelect = (template: string) => {
    setCampaignData(prev => ({ ...prev, template }));
    
    // Generate campaign preview based on template
    const previewData = generateCampaignPreview(template, campaignData);
    setCampaignData(prev => ({ ...prev, ...previewData }));
    setCurrentStep('preview');
  };

  const generateCampaignPreview = (template: string, data: CampaignData) => {
    const templates = {
      'glow-up': {
        headline: '✨ Transform Your Look Today',
        bodyText: 'Discover the secret to radiant confidence. Join thousands who\'ve already made the change.',
        cta: 'Start Your Glow-Up',
        targetAudience: 'Women 18-35 interested in beauty and wellness',
        postTime: 'Tuesday-Thursday 7-9 PM'
      },
      'minimalist': {
        headline: 'Simply Beautiful',
        bodyText: 'Less is more. Experience the power of simplicity in every detail.',
        cta: 'Discover More',
        targetAudience: 'Design-conscious individuals 25-45',
        postTime: 'Monday-Wednesday 10 AM-12 PM'
      },
      'testimonial': {
        headline: 'Real Results, Real People',
        bodyText: 'See why our community can\'t stop talking about their amazing transformations.',
        cta: 'Join the Community',
        targetAudience: 'Previous customers and lookalikes',
        postTime: 'Friday-Sunday 6-8 PM'
      }
    };
    
    return templates[template as keyof typeof templates] || templates['glow-up'];
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-32 h-32 border-2 border-dashed border-primary rounded-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-creative/5">
              <Camera className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Upload Your Campaign Image</h2>
              <p className="text-muted-foreground">I'll analyze your image to create the perfect campaign strategy</p>
            </div>
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="border-2 border-dashed border-primary rounded-lg p-8 hover:bg-primary/5 transition-colors">
                <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-6">
            {isAnalyzing ? (
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground">Analyzing your image for campaign insights...</p>
              </div>
            ) : (
              <>
                {campaignData.image && (
                  <div className="flex flex-col md:flex-row gap-6">
                    <img 
                      src={campaignData.image} 
                      alt="Uploaded campaign image" 
                      className="w-full md:w-1/3 h-48 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Analysis Complete! 🎉</h3>
                        <p className="text-muted-foreground">{campaignData.description}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Visual Tags</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {campaignData.tags?.map((tag, index) => (
                            <Badge key={index} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Choose Your Campaign Theme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'luxury', title: 'Luxury Launch', desc: 'Premium, exclusive positioning' },
                      { id: 'awareness', title: 'Brand Awareness', desc: 'Build recognition and trust' },
                      { id: 'conversion', title: 'High Conversion', desc: 'Drive sales and action' }
                    ].map((theme) => (
                      <Card 
                        key={theme.id} 
                        className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                        onClick={() => handleThemeSelect(theme.id)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{theme.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{theme.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Campaign Details (Optional)</h3>
              <p className="text-muted-foreground mb-6">Provide additional details to customize your campaign</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input 
                  id="audience"
                  placeholder="e.g., Women 25-35 interested in fitness"
                  value={campaignData.audience || ''}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, audience: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select onValueChange={(value) => setCampaignData(prev => ({ ...prev, budget: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">$100 - $500</SelectItem>
                    <SelectItem value="medium">$500 - $2,000</SelectItem>
                    <SelectItem value="large">$2,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select onValueChange={(value) => setCampaignData(prev => ({ ...prev, platform: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="google">Google Ads</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="launch-date">Launch Date</Label>
                <Input 
                  id="launch-date"
                  type="date"
                  value={campaignData.launchDate || ''}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, launchDate: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => setCurrentStep('template')} className="bg-gradient-to-r from-primary to-creative">
                Continue to Templates
              </Button>
            </div>
          </div>
        );

      case 'template':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Your Campaign Template</h3>
              <p className="text-muted-foreground mb-6">Select a template that matches your campaign goals</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'glow-up', title: 'Glow-Up Reveal', desc: 'Perfect for beauty and transformation campaigns', icon: '✨' },
                { id: 'minimalist', title: 'Minimalist Tease', desc: 'Clean, sophisticated approach for premium brands', icon: '🎯' },
                { id: 'testimonial', title: 'Testimonial Booster', desc: 'Social proof-driven campaigns that convert', icon: '💬' }
              ].map((template) => (
                <Card 
                  key={template.id}
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardHeader>
                    <div className="text-2xl mb-2">{template.icon}</div>
                    <CardTitle className="text-base">{template.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{template.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">🎉 Your Campaign Preview</h3>
              <p className="text-muted-foreground">Here's your personalized campaign ready to launch!</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Campaign Preview */}
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Campaign Ad Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {campaignData.image && (
                    <img 
                      src={campaignData.image} 
                      alt="Campaign visual" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-lg">{campaignData.headline}</h4>
                    <p className="text-muted-foreground mt-2">{campaignData.bodyText}</p>
                    <Button size="sm" className="mt-3 bg-gradient-to-r from-primary to-creative">
                      {campaignData.cta}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Campaign Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-creative" />
                    Campaign Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="font-medium">Target Audience</Label>
                    <p className="text-sm text-muted-foreground">{campaignData.targetAudience}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Optimal Post Time</Label>
                    <p className="text-sm text-muted-foreground">{campaignData.postTime}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Campaign Theme</Label>
                    <Badge variant="secondary" className="ml-2">{campaignData.theme}</Badge>
                  </div>
                  <div>
                    <Label className="font-medium">Template Used</Label>
                    <Badge variant="outline" className="ml-2">{campaignData.template}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={() => setCurrentStep('export')}
                className="bg-gradient-to-r from-success to-primary"
                size="lg"
              >
                Looks Great! Continue to Export
              </Button>
            </div>
          </div>
        );

      case 'export':
        return (
          <div className="space-y-6 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">🚀 Ready to Launch!</h3>
              <p className="text-muted-foreground">Choose how you'd like to save or export your campaign</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'save', title: 'Save Campaign', desc: 'Save to your account', icon: Save, color: 'bg-primary' },
                { id: 'download', title: 'Download Assets', desc: 'Get campaign files', icon: Download, color: 'bg-creative' },
                { id: 'share', title: 'Share Link', desc: 'Share with your team', icon: Share2, color: 'bg-success' },
                { id: 'edit', title: 'Edit & Refine', desc: 'Make adjustments', icon: Edit, color: 'bg-warning' }
              ].map((action) => (
                <Card 
                  key={action.id}
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() => {
                    toast({
                      title: `${action.title} initiated!`,
                      description: `Your campaign ${action.title.toLowerCase()} is being processed.`
                    });
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold mb-1">{action.title}</h4>
                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button 
              onClick={() => {
                setCampaignData({});
                setCurrentStep('upload');
                toast({
                  title: "New campaign started!",
                  description: "Ready to create another amazing campaign."
                });
              }}
              variant="outline"
              className="mt-8"
            >
              Create Another Campaign
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-creative bg-clip-text text-transparent">
            Campaign Creation Assistant
          </h1>
          <p className="text-muted-foreground">Transform your images into powerful marketing campaigns</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            {['upload', 'theme', 'details', 'template', 'preview', 'export'].map((step, index) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  ['upload', 'theme', 'details', 'template', 'preview', 'export'].indexOf(currentStep) >= index
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                {index < 5 && (
                  <div className={`w-8 h-0.5 transition-colors ${
                    ['upload', 'theme', 'details', 'template', 'preview', 'export'].indexOf(currentStep) > index
                      ? 'bg-primary' 
                      : 'bg-muted'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignCreator;