import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage, CampaignData } from '@/types/campaign';
import MessageBubble from './MessageBubble';
import ImageUploader from './ImageUploader';
import ThemeSelector from './ThemeSelector';
import PlatformSelector from './PlatformSelector';
import TemplateSelector from './TemplateSelector';
import CampaignDetails from './CampaignDetails';
import CampaignPreview from './CampaignPreview';
import APIKeySetup from './APIKeySetup';
import PreviewPanel from './PreviewPanel';
import { OpenAIService } from '@/services/openai';
import { useToast } from '@/components/ui/use-toast';

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your Campaign Creation Assistant! 🎨 Upload an image and I'll help you create an amazing marketing campaign. What would you like to promote today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [campaignData, setCampaignData] = useState<CampaignData>({});
  const [currentStep, setCurrentStep] = useState<'setup' | 'upload' | 'analyze' | 'theme' | 'platform' | 'details' | 'template' | 'preview'>('setup');
  const [extractedThemes, setExtractedThemes] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showPreviewPanel, setShowPreviewPanel] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, type: 'user' | 'assistant', component?: React.ReactNode) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      component
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleImageUpload = async (imageUrl: string, tags: string[], description: string) => {
    setCampaignData(prev => ({ ...prev, image: imageUrl, tags, description }));
    addMessage("Image uploaded! Analyzing with AI...", 'assistant');
    
    setIsAnalyzing(true);
    try {
      const themes = await OpenAIService.extractImageThemes(imageUrl, description, tags);
      setExtractedThemes(themes);
      
      addMessage("AI Analysis Complete! ✨", 'assistant', 
        <div className="mt-4 space-y-4">
          <img src={imageUrl} alt="Uploaded" className="w-full max-w-xs rounded-lg" />
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium">AI-Generated Themes:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {themes.themes.map((theme, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Primary Theme: <span className="text-primary">{themes.primaryTheme}</span></p>
              <p className="text-sm text-muted-foreground">Target: {themes.targetAudience}</p>
            </div>
          </div>
        </div>
      );
      
      setTimeout(() => {
        addMessage("Now, which platform will you be advertising on?", 'assistant',
          <PlatformSelector onSelect={handlePlatformSelect} />
        );
        setCurrentStep('platform');
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Analysis Error",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive"
      });
      addMessage("Sorry, I couldn't analyze your image. Let's continue manually.", 'assistant',
        <ThemeSelector onSelect={handleThemeSelect} />
      );
      setCurrentStep('theme');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleThemeSelect = (theme: string) => {
    setCampaignData(prev => ({ ...prev, theme }));
    addMessage(`Great choice! "${theme}" theme selected. 🎯`, 'user');
    
    setTimeout(() => {
      addMessage("Now, which platform will you be advertising on? This helps me create the perfect template dimensions.", 'assistant',
        <PlatformSelector onSelect={handlePlatformSelect} />
      );
      setCurrentStep('platform');
    }, 500);
  };

  const handlePlatformSelect = (platform: string, customDimensions?: { width: number; height: number }) => {
    setCampaignData(prev => ({ ...prev, platform: platform as any, customDimensions }));
    addMessage(`Platform selected: ${platform.replace(/_/g, ' ')} 📱`, 'user');
    
    setTimeout(() => {
      addMessage("Would you like to add any additional details? (Optional but helps create better campaigns)", 'assistant',
        <CampaignDetails onComplete={handleDetailsComplete} />
      );
      setCurrentStep('details');
    }, 500);
  };

  const handleDetailsComplete = (details: Partial<CampaignData>) => {
    setCampaignData(prev => {
      const updatedData = { ...prev, ...details };
      
      // Use setTimeout to ensure state is updated before rendering TemplateSelector
      setTimeout(() => {
        addMessage("Details saved! Now let's choose a design template. Your image will be automatically inserted into the template.", 'assistant',
          <TemplateSelector 
            platform={updatedData.platform!} 
            customDimensions={updatedData.customDimensions}
            userImage={updatedData.image}
            userText={updatedData.description}
            extractedThemes={extractedThemes}
            onSelect={handleTemplateSelect} 
          />
        );
        setCurrentStep('template');
      }, 100);
      
      return updatedData;
    });
  };

  const handleTemplateSelect = (templateId: string, templateData: any) => {
    addMessage("Template selected! Opening preview panel...", 'user');
    
    setSelectedTemplate(templateData);
    setCampaignData(prev => ({ ...prev, template: templateId }));
    setShowPreviewPanel(true);
    setCurrentStep('preview');
  };

  const handleDownload = () => {
    addMessage("Campaign downloaded successfully! 📥", 'assistant');
  };

  const handlePublish = () => {
    addMessage("Campaign published to platform! 🚀", 'assistant');
  };

  const handleRegenerate = () => {
    addMessage("Regenerating campaign with new AI suggestions...", 'assistant');
    // Reset to template selection with new suggestions
    setTimeout(() => {
      addMessage("Here are fresh template suggestions for your campaign:", 'assistant',
        <TemplateSelector 
          platform={campaignData.platform!} 
          customDimensions={campaignData.customDimensions}
          userImage={campaignData.image}
          userText={campaignData.description}
          extractedThemes={extractedThemes}
          onSelect={handleTemplateSelect} 
        />
      );
    }, 1000);
  };

  const handleEdit = () => {
    addMessage("What would you like to edit? You can update your campaign details:", 'assistant',
      <CampaignDetails onComplete={handleDetailsComplete} />
    );
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      addMessage(input, 'user');
      setInput('');
      
      // Simple response logic
      setTimeout(() => {
        addMessage("I understand! Let me help you with that. Could you please upload an image to get started?", 'assistant');
      }, 500);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-creative rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold">Campaign Assistant</h1>
            <p className="text-sm text-muted-foreground">AI-powered campaign creator</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {currentStep === 'setup' && !OpenAIService.getApiKey() && (
          <div className="flex justify-start">
            <div className="max-w-md">
              <APIKeySetup onSetup={() => setCurrentStep('upload')} />
            </div>
          </div>
        )}
        
        {currentStep === 'upload' && OpenAIService.getApiKey() && (
          <div className="flex justify-start">
            <div className="max-w-md">
              <ImageUploader onUpload={handleImageUpload} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Preview Panel */}
      {showPreviewPanel && selectedTemplate && (
        <PreviewPanel
          campaignData={campaignData}
          selectedTemplate={selectedTemplate}
          isVisible={showPreviewPanel}
          onClose={() => setShowPreviewPanel(false)}
          onDownload={handleDownload}
          onPublish={handlePublish}
          onRegenerate={handleRegenerate}
        />
      )}

      {/* Input */}
      <div className="border-t bg-card/50 backdrop-blur-sm p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;