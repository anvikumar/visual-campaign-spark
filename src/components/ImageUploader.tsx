import React, { useCallback } from 'react';
import { Upload, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ImageUploaderProps {
  onUpload: (imageUrl: string, tags: string[], description: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        // Simulate AI analysis
        setTimeout(() => {
          const mockTags = ['lifestyle', 'premium', 'modern', 'elegant', 'youthful', 'vibrant'];
          const mockDescription = 'A beautifully composed image showcasing modern lifestyle elements with clean, elegant aesthetics perfect for premium brand campaigns.';
          
          onUpload(imageUrl, mockTags, mockDescription);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  return (
    <Card className="border-2 border-dashed border-primary/50 hover:border-primary transition-colors">
      <CardContent className="p-6">
        <label htmlFor="image-upload" className="cursor-pointer block">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-creative/10 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <div>
              <Upload className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Upload your image</p>
              <p className="text-xs text-muted-foreground">Click or drag to upload</p>
            </div>
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;