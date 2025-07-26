import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Type, 
  Image as ImageIcon, 
  Move, 
  Trash2, 
  Download,
  Plus,
  Minus
} from 'lucide-react';

interface CanvasEditorProps {
  templateImage?: string;
  userImage?: string;
  dimensions: { width: number; height: number };
  onSave: (dataUrl: string) => void;
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({
  templateImage,
  userImage,
  dimensions,
  onSave
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: '#ffffff'
    });

    setCanvas(fabricCanvas);

    // Load template image as background
    if (templateImage) {
      fabric.Image.fromURL(templateImage, (img) => {
        img.scaleToWidth(dimensions.width);
        img.scaleToHeight(dimensions.height);
        img.set({
          left: 0,
          top: 0,
          selectable: true,
          evented: true
        });
        fabricCanvas.add(img);
        fabricCanvas.renderAll();
      });
    }

    // Auto-place user image
    if (userImage) {
      fabric.Image.fromURL(userImage, (img) => {
        const scale = Math.min(
          (dimensions.width * 0.4) / img.width!,
          (dimensions.height * 0.4) / img.height!
        );
        img.scale(scale);
        img.set({
          left: dimensions.width * 0.3,
          top: dimensions.height * 0.3,
          selectable: true,
          evented: true
        });
        fabricCanvas.add(img);
        fabricCanvas.renderAll();
      });
    }

    // Handle object selection
    fabricCanvas.on('selection:created', (e) => {
      setSelectedObject(e.selected![0]);
    });

    fabricCanvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected![0]);
    });

    fabricCanvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    return () => {
      fabricCanvas.dispose();
    };
  }, [templateImage, userImage, dimensions]);

  const addText = () => {
    if (!canvas || !textInput.trim()) return;

    const text = new fabric.Text(textInput, {
      left: 50,
      top: 50,
      fontFamily: 'Arial',
      fontSize: 24,
      fill: '#000000',
      selectable: true,
      editable: true
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    setTextInput('');
  };

  const deleteSelected = () => {
    if (!canvas || !selectedObject) return;
    canvas.remove(selectedObject);
    canvas.renderAll();
    setSelectedObject(null);
  };

  const bringToFront = () => {
    if (!canvas || !selectedObject) return;
    canvas.bringToFront(selectedObject);
    canvas.renderAll();
  };

  const sendToBack = () => {
    if (!canvas || !selectedObject) return;
    canvas.sendToBack(selectedObject);
    canvas.renderAll();
  };

  const handleSave = () => {
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
  };

  const changeFontSize = (increase: boolean) => {
    if (!canvas || !selectedObject || selectedObject.type !== 'text') return;
    
    const textObject = selectedObject as fabric.Text;
    const currentSize = textObject.fontSize || 20;
    const newSize = increase ? currentSize + 2 : Math.max(8, currentSize - 2);
    
    textObject.set('fontSize', newSize);
    canvas.renderAll();
  };

  const changeTextColor = (color: string) => {
    if (!canvas || !selectedObject || selectedObject.type !== 'text') return;
    
    selectedObject.set('fill', color);
    canvas.renderAll();
  };

  return (
    <div className="space-y-4">
      {/* Canvas */}
      <div className="border border-border rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>

      {/* Tools */}
      <div className="space-y-4">
        {/* Add Text */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Add Text</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter text..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addText()}
              className="flex-1"
            />
            <Button onClick={addText} size="sm">
              <Type className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Object Controls */}
        {selectedObject && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Edit Selected</Label>
            
            <div className="flex gap-2">
              <Button onClick={deleteSelected} variant="destructive" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button onClick={bringToFront} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
              <Button onClick={sendToBack} variant="outline" size="sm">
                <Minus className="w-4 h-4" />
              </Button>
            </div>

            {selectedObject.type === 'text' && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => changeFontSize(false)} 
                    variant="outline" 
                    size="sm"
                  >
                    A-
                  </Button>
                  <Button 
                    onClick={() => changeFontSize(true)} 
                    variant="outline" 
                    size="sm"
                  >
                    A+
                  </Button>
                </div>
                <div className="flex gap-2">
                  {['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'].map((color) => (
                    <button
                      key={color}
                      onClick={() => changeTextColor(color)}
                      className="w-6 h-6 rounded border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Separator />

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Save Design
        </Button>
      </div>
    </div>
  );
};

export default CanvasEditor;