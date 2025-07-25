import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Key, AlertCircle } from 'lucide-react';
import { OpenAIService } from '@/services/openai';
import { useToast } from '@/components/ui/use-toast';

interface APIKeySetupProps {
  onSetup: () => void;
}

const APIKeySetup: React.FC<APIKeySetupProps> = ({ onSetup }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isTestingKey, setIsTestingKey] = useState(false);
  const { toast } = useToast();

  const handleSetupKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }

    setIsTestingKey(true);
    
    try {
      const isValid = await OpenAIService.testApiKey(apiKey);
      
      if (isValid) {
        OpenAIService.saveApiKey(apiKey);
        toast({
          title: "Success!",
          description: "OpenAI API key saved successfully"
        });
        onSetup();
      } else {
        toast({
          title: "Invalid API Key",
          description: "Please check your OpenAI API key and try again",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate API key. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTestingKey(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
          <Key className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>Setup OpenAI Integration</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your OpenAI API key to enable AI-powered theme analysis and template recommendations
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            type={showKey ? "text" : "password"}
            placeholder="sk-proj-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-amber-800">
            <p className="font-medium mb-1">Security Note:</p>
            <p>Your API key will be stored in your browser's local storage. For production use, consider using a backend service.</p>
          </div>
        </div>

        <Button 
          onClick={handleSetupKey} 
          className="w-full"
          disabled={isTestingKey}
        >
          {isTestingKey ? "Validating..." : "Save & Continue"}
        </Button>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Don't have an API key?{" "}
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get one here
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIKeySetup;