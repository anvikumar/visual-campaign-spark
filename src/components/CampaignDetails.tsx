import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CampaignData } from '@/types/campaign';
import { Info } from 'lucide-react';

interface CampaignDetailsProps {
  onComplete: (details: Partial<CampaignData>) => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ onComplete }) => {
  const [details, setDetails] = useState<Partial<CampaignData>>({});

  const handleSubmit = () => {
    onComplete(details);
  };

  const handleSkip = () => {
    onComplete({});
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Campaign Details (Optional)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="description">Campaign Description</Label>
          <Textarea
            id="description"
            placeholder="Describe what you're promoting..."
            value={details.description || ''}
            onChange={(e) => setDetails(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="audience">Target Audience</Label>
            <Input 
              id="audience"
              placeholder="e.g., Women 25-35 interested in fitness"
              value={details.audience || ''}
              onChange={(e) => setDetails(prev => ({ ...prev, audience: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="budget">Budget Range</Label>
            <Select onValueChange={(value) => setDetails(prev => ({ ...prev, budget: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">$100 - $500</SelectItem>
                <SelectItem value="medium">$500 - $2,000</SelectItem>
                <SelectItem value="large">$2,000 - $10,000</SelectItem>
                <SelectItem value="enterprise">$10,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="launch-date">Launch Date</Label>
          <Input 
            id="launch-date"
            type="date"
            value={details.launchDate || ''}
            onChange={(e) => setDetails(prev => ({ ...prev, launchDate: e.target.value }))}
          />
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSubmit} className="flex-1">
            Continue with Details
          </Button>
          <Button variant="outline" onClick={handleSkip}>
            Skip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignDetails;