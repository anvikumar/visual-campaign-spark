import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage } from '@/types/campaign';
import { Card, CardContent } from '@/components/ui/card';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAssistant = message.type === 'assistant';

  return (
    <div className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      {isAssistant && (
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-creative rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-md ${!isAssistant ? 'order-first' : ''}`}>
        <Card className={`${isAssistant ? 'bg-card' : 'bg-primary text-primary-foreground'}`}>
          <CardContent className="p-3">
            <p className="text-sm">{message.content}</p>
            {message.component && (
              <div className="mt-3">
                {message.component}
              </div>
            )}
          </CardContent>
        </Card>
        <p className="text-xs text-muted-foreground mt-1 px-2">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {!isAssistant && (
        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;