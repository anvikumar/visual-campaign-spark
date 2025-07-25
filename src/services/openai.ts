import OpenAI from 'openai';

interface AIThemeExtractionResponse {
  themes: string[];
  primaryTheme: string;
  mood: string;
  colorPalette: string[];
  targetAudience: string;
  keywords: string[];
}

interface AITemplateRecommendation {
  templateId: string;
  templateName: string;
  description: string;
  suitabilityScore: number;
  reasoning: string;
  designStyle: string;
}

export class OpenAIService {
  private static API_KEY_STORAGE_KEY = 'openai_api_key';
  private static openai: OpenAI | null = null;

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    this.openai = new OpenAI({ 
      apiKey,
      dangerouslyAllowBrowser: true 
    });
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      const testClient = new OpenAI({ 
        apiKey,
        dangerouslyAllowBrowser: true 
      });
      await testClient.models.list();
      return true;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async extractImageThemes(
    imageUrl: string, 
    description: string, 
    tags: string[]
  ): Promise<AIThemeExtractionResponse> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    if (!this.openai) {
      this.openai = new OpenAI({ 
        apiKey,
        dangerouslyAllowBrowser: true 
      });
    }

    const prompt = `
    Analyze this image and extracted data to suggest marketing campaign themes:

    Image Description: ${description}
    Image Tags: ${tags.join(', ')}

    Based on this information, provide:
    1. 5-7 relevant marketing themes
    2. The primary theme that would work best
    3. The overall mood/tone
    4. Suggested color palette (3-5 colors)
    5. Target audience
    6. Marketing keywords

    Respond in JSON format with the structure:
    {
      "themes": ["theme1", "theme2", ...],
      "primaryTheme": "main theme",
      "mood": "mood description",
      "colorPalette": ["#color1", "#color2", ...],
      "targetAudience": "audience description",
      "keywords": ["keyword1", "keyword2", ...]
    }
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4.1-2025-04-14",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: imageUrl } }
            ]
          }
        ],
        max_tokens: 800,
        temperature: 0.7
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content) as AIThemeExtractionResponse;
    } catch (error) {
      console.error('Error extracting themes:', error);
      throw error;
    }
  }

  static async recommendTemplates(
    platform: string,
    themes: AIThemeExtractionResponse,
    availableTemplates: Array<{id: string, name: string, style: string}>
  ): Promise<AITemplateRecommendation[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    if (!this.openai) {
      this.openai = new OpenAI({ 
        apiKey,
        dangerouslyAllowBrowser: true 
      });
    }

    const prompt = `
    You are a marketing design expert. Recommend the best design templates for this campaign:

    Platform: ${platform}
    Primary Theme: ${themes.primaryTheme}
    All Themes: ${themes.themes.join(', ')}
    Mood: ${themes.mood}
    Target Audience: ${themes.targetAudience}
    Keywords: ${themes.keywords.join(', ')}

    Available Templates:
    ${availableTemplates.map(t => `- ${t.id}: ${t.name} (${t.style})`).join('\n')}

    Rank and recommend the top 6 templates. For each recommendation, provide:
    - Template ID
    - Suitability score (1-10)
    - Reasoning for the recommendation
    - How well it matches the theme and platform

    Respond in JSON format as an array:
    [
      {
        "templateId": "template-id",
        "templateName": "template name",
        "description": "why this works",
        "suitabilityScore": 8,
        "reasoning": "detailed explanation",
        "designStyle": "style description"
      }
    ]
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4.1-2025-04-14",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.3
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error('No response from OpenAI');

      return JSON.parse(content) as AITemplateRecommendation[];
    } catch (error) {
      console.error('Error recommending templates:', error);
      throw error;
    }
  }
}