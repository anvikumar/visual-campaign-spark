import React from 'react';
import { cn } from '@/lib/utils';

interface TemplatePreviewProps {
  template: {
    id: string;
    name: string;
    style: string;
  };
  userImage?: string;
  userText?: string;
  dimensions: { width: number; height: number };
  className?: string;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ 
  template, 
  userImage, 
  userText, 
  dimensions,
  className 
}) => {
  const aspectRatio = dimensions.width / dimensions.height;
  const previewWidth = 200;
  const previewHeight = previewWidth / aspectRatio;

  const renderTemplate = () => {
    switch (template.id) {
      case 'hero-overlay':
        return (
          <div 
            className="relative overflow-hidden rounded-lg"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-transparent z-10" />
            {userImage ? (
              <img src={userImage} alt="Product" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
            )}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-start p-4 text-white">
              <h3 className="text-lg font-bold mb-1">NEW ARRIVAL</h3>
              <p className="text-xs opacity-90">{userText || "Transform your style"}</p>
            </div>
          </div>
        );

      case 'split-layout':
        return (
          <div 
            className="flex overflow-hidden rounded-lg bg-white"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <div className="flex-1 relative">
              {userImage ? (
                <img src={userImage} alt="Product" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink-100 to-orange-100" />
              )}
            </div>
            <div className="flex-1 flex flex-col justify-center p-3 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800 mb-1">FEATURED</h3>
              <p className="text-xs text-slate-600">{userText || "Premium quality"}</p>
              <button className="mt-2 px-2 py-1 bg-slate-800 text-white text-xs rounded">Shop Now</button>
            </div>
          </div>
        );

      case 'minimal-frame':
        return (
          <div 
            className="bg-white p-4 rounded-lg border-2 border-slate-200"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <div className="relative h-full">
              {userImage ? (
                <img src={userImage} alt="Product" className="w-full h-3/4 object-cover rounded" />
              ) : (
                <div className="w-full h-3/4 bg-gradient-to-br from-green-100 to-blue-100 rounded" />
              )}
              <div className="pt-2 text-center">
                <h3 className="text-sm font-semibold text-slate-800">{userText || "Premium Collection"}</h3>
              </div>
            </div>
          </div>
        );

      case 'testimonial-style':
        return (
          <div 
            className="relative bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <div className="absolute top-2 left-2 w-8 h-8 rounded-full overflow-hidden">
              {userImage ? (
                <img src={userImage} alt="Product" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200" />
              )}
            </div>
            <div className="mt-10 bg-white p-3 rounded-lg shadow-sm">
              <p className="text-xs text-slate-600 italic">"{userText || "Amazing quality! Highly recommend."}"</p>
              <p className="text-xs text-slate-800 font-medium mt-1">⭐⭐⭐⭐⭐</p>
            </div>
          </div>
        );

      case 'product-showcase':
        return (
          <div 
            className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-lg"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</div>
            <div className="h-2/3 relative">
              {userImage ? (
                <img src={userImage} alt="Product" className="w-full h-full object-cover rounded" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-200 rounded" />
              )}
            </div>
            <div className="pt-2">
              <h3 className="text-sm font-bold text-slate-800">{userText || "Latest Launch"}</h3>
              <p className="text-xs text-slate-600">Starting at $99</p>
            </div>
          </div>
        );

      case 'dynamic-burst':
        return (
          <div 
            className="relative bg-gradient-to-br from-cyan-100 to-blue-100 p-3 rounded-lg overflow-hidden"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent)]" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex-1 relative">
                {userImage ? (
                  <img src={userImage} alt="Product" className="w-full h-full object-cover rounded" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-200 to-blue-200 rounded" />
                )}
              </div>
              <div className="pt-2 text-center">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">{userText || "Power Up"}</h3>
              </div>
            </div>
          </div>
        );

      // Additional templates for second set
      case 'magazine-spread':
        return (
          <div 
            className="relative bg-white p-2 rounded-lg"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <div className="grid grid-cols-3 h-full gap-1">
              <div className="col-span-2 relative">
                {userImage ? (
                  <img src={userImage} alt="Product" className="w-full h-full object-cover rounded" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-300 rounded" />
                )}
              </div>
              <div className="flex flex-col justify-center p-2">
                <h3 className="text-xs font-bold text-slate-800 mb-1">EDITORIAL</h3>
                <p className="text-xs text-slate-600">{userText || "Luxury lifestyle"}</p>
              </div>
            </div>
          </div>
        );

      case 'neon-glow':
        return (
          <div 
            className="relative bg-black p-3 rounded-lg overflow-hidden"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex-1 relative">
                {userImage ? (
                  <img src={userImage} alt="Product" className="w-full h-full object-cover rounded border border-purple-500/50" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900 to-cyan-900 rounded border border-purple-500/50" />
                )}
              </div>
              <div className="pt-2 text-center">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wide">{userText || "Future Tech"}</h3>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div 
            className="bg-gray-100 flex items-center justify-center rounded-lg"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <div className="text-center">
              <span className="text-gray-500 text-xs">{template.name || "Template Preview"}</span>
              {userImage && (
                <img src={userImage} alt="Product" className="w-12 h-12 object-cover rounded mt-2 mx-auto" />
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn("relative", className)}>
      {renderTemplate()}
    </div>
  );
};

export default TemplatePreview;