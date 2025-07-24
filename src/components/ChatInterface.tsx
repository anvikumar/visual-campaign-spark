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
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyze' | 'theme' | 'platform' | 'details' | 'template' | 'preview'>('upload');
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

  const handleImageUpload = (imageUrl: string, tags: string[], description: string) => {
    setCampaignData(prev => ({ ...prev, image: imageUrl, tags, description }));
    addMessage("Here's what I found in your image! ✨", 'assistant', 
      <div className="mt-4 space-y-4">
        <img src={imageUrl} alt="Uploaded" className="w-full max-w-xs rounded-lg" />
        <div>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
    
    setTimeout(() => {
      addMessage("Perfect! Now let's choose a campaign theme that matches your image. What vibe are you going for?", 'assistant',
        <ThemeSelector onSelect={handleThemeSelect} />
      );
      setCurrentStep('theme');
    }, 1000);
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
            onSelect={handleTemplateSelect} 
          />
        );
        setCurrentStep('template');
      }, 100);
      
      return updatedData;
    });
  };

  const handleTemplateSelect = (templateId: string) => {
    setCampaignData(prev => ({ ...prev, template: templateId }));
    addMessage("Template selected! Generating your campaign...", 'user');
    
    setTimeout(() => {
      addMessage("🎉 Your campaign is ready! Here's your personalized design with your image and content integrated:", 'assistant');
      setCurrentStep('preview');
    }, 1000);
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
        
        {currentStep === 'upload' && (
          <div className="flex justify-start">
            <div className="max-w-md">
              <ImageUploader onUpload={handleImageUpload} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

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