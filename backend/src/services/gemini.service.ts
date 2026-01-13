import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Google Gemini AI Service
 * Handles all AI content generation using Google's Gemini API
 */
class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      console.error('❌ GOOGLE_GEMINI_API_KEY is not set in environment variables');
      console.error('📝 Please check your backend/.env file');
      console.error('🔍 Current env keys:', Object.keys(process.env).filter(k => k.includes('GOOGLE')));
      throw new Error('GOOGLE_GEMINI_API_KEY is not set in environment variables');
    }

    console.log('✅ Gemini AI service initialized');
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Generate a question-focused main title/H1
   */
  async generateMainQuestion(blogContent: string, currentTitle?: string): Promise<string> {
    const prompt = `
You are an SEO expert optimizing content for AI chatbots like ChatGPT and Perplexity.

Given the following blog content, create a question-focused H1 title that:
- Targets user search intent
- Is 50-100 characters
- Starts with "What", "How", "Why", "When", or "Which"
- Is engaging and click-worthy

${currentTitle ? `Current title: ${currentTitle}\n` : ''}

Blog content:
${blogContent.substring(0, 2000)}

Generate ONLY the question title, nothing else.
`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }

  /**
   * Generate a concise 1-2 sentence direct answer
   */
  async generateDirectAnswer(blogContent: string, mainQuestion: string): Promise<string> {
    const prompt = `
You are an SEO expert optimizing content for AI chatbots.

Question: ${mainQuestion}

Blog content:
${blogContent.substring(0, 3000)}

Generate a concise, direct answer to the question above. Requirements:
- Maximum 2 sentences
- Maximum 300 characters
- Start immediately with the answer (no preamble)
- Be factual and specific
- Use active voice

Generate ONLY the direct answer, nothing else.
`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }

  /**
   * Generate TL;DR summary with bullet points
   */
  async generateTldrSummary(blogContent: string): Promise<string> {
    const prompt = `
You are an SEO expert creating a TL;DR summary for AI-optimized content.

Blog content:
${blogContent.substring(0, 4000)}

Generate a TL;DR summary with 3-5 bullet points. Requirements:
- Each bullet should be concise (one line)
- Focus on key takeaways and actionable insights
- Use bullet format with "•" character
- No title, just the bullets

Example format:
• First key point here
• Second key point here
• Third key point here

Generate ONLY the bullet points, nothing else.
`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }

  /**
   * Generate author credibility text
   */
  async generateAuthorCredibility(blogContent: string, currentAuthor?: string): Promise<string> {
    const prompt = `
You are an SEO expert creating author credibility information.

${currentAuthor ? `Current author: ${currentAuthor}\n` : ''}

Blog content:
${blogContent.substring(0, 2000)}

Generate a credible author byline that includes:
- Name (if not provided, create a relevant expert name)
- Title/expertise
- Company/affiliation (optional)

Keep it to one line, 50-100 characters.

Example: "Dr. Sarah Chen, AI Research Lead at TechCorp"

Generate ONLY the author byline, nothing else.
`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }

  /**
   * Generate Call to Action text
   */
  async generateCTAText(blogContent: string): Promise<string> {
    const prompt = `
You are an SEO expert creating a compelling call-to-action.

Blog content:
${blogContent.substring(0, 2000)}

Generate an engaging CTA message (2-3 sentences) that:
- Encourages reader interaction
- Is relevant to the blog topic
- Creates urgency or value
- Invites next steps

Generate ONLY the CTA text, nothing else.
`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }

  /**
   * Generate Call to Action button text
   */
  async generateCTAButton(ctaText: string): Promise<string> {
    const prompt = `
You are an SEO expert creating a CTA button.

CTA message: ${ctaText}

Generate a short, action-oriented button text (2-5 words) that:
- Uses active verbs (Get, Start, Learn, Try, Discover, etc.)
- Is compelling and clear
- Maximum 50 characters

Examples: "Get Started Now", "Learn More", "Try It Free"

Generate ONLY the button text, nothing else.
`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }

  /**
   * Optimize meta tags (title and description)
   */
  async optimizeMetaTags(
    blogContent: string,
    currentTitle?: string,
    currentDescription?: string
  ): Promise<{ title: string; description: string }> {
    const prompt = `
You are an SEO expert optimizing meta tags for search engines and AI chatbots.

Blog content:
${blogContent.substring(0, 3000)}

${currentTitle ? `Current title: ${currentTitle}\n` : ''}
${currentDescription ? `Current description: ${currentDescription}\n` : ''}

Generate optimized meta tags:

1. Title tag:
- 50-60 characters
- Include primary keyword
- Compelling and click-worthy
- Front-load important words

2. Meta description:
- 120-160 characters
- Include primary and secondary keywords
- Compelling call-to-action
- Summarize value proposition

Return in this exact format:
TITLE: [title here]
DESCRIPTION: [description here]
`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response
    const titleMatch = text.match(/TITLE:\s*(.+)/);
    const descMatch = text.match(/DESCRIPTION:\s*(.+)/);

    return {
      title: titleMatch ? titleMatch[1].trim() : currentTitle || 'Optimized Title',
      description: descMatch
        ? descMatch[1].trim()
        : currentDescription || 'Optimized description',
    };
  }

  /**
   * Generate schema markup suggestions
   */
  async generateSchemaMarkup(
    blogContent: string,
    metadata: any
  ): Promise<Array<{ type: string; data: any }>> {
    const prompt = `
You are an SEO expert generating structured data (Schema.org) recommendations.

Blog content:
${blogContent.substring(0, 2000)}

Title: ${metadata.title || 'N/A'}
Author: ${metadata.author || 'N/A'}

Analyze the content and recommend which schema types would be most appropriate from:
- Article
- BlogPosting
- HowTo
- FAQ
- Review

Return only the schema type names, comma-separated.
Example: Article, FAQ
`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const schemaTypes = response
      .text()
      .trim()
      .split(',')
      .map((s: string) => s.trim());

    // Generate basic schema objects
    const schemas = schemaTypes.map((type: string) => ({
      type,
      data: {
        '@context': 'https://schema.org',
        '@type': type,
        headline: metadata.title,
        description: metadata.description,
        author: {
          '@type': 'Person',
          name: metadata.author || 'Author',
        },
      },
    }));

    return schemas;
  }

  /**
   * Improve existing content formatting
   */
  async improveFormatting(content: string): Promise<string> {
    const prompt = `
You are an SEO expert improving content structure for AI readability.

Current content:
${content.substring(0, 5000)}

Improve the formatting by:
- Adding H2/H3 headings where appropriate
- Converting long paragraphs to bullet points where relevant
- Ensuring one idea per paragraph
- Adding clear section breaks

Return the improved content in HTML format.
`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }

  /**
   * Deep AI-powered content analysis
   * Analyzes content quality for AI chatbot optimization
   */
  async analyzeContentDeep(blogContent: string, metadata: any): Promise<any> {
    const prompt = `
You are an expert SEO analyst evaluating content for AI chatbot optimization (ChatGPT, Perplexity, etc.).

Analyze this blog content and provide detailed quality scores.

Blog Content:
${blogContent.substring(0, 6000)}

Metadata:
Title: ${metadata.title || 'N/A'}
Author: ${metadata.author || 'N/A'}
Word Count: ${blogContent.split(' ').length}

For each criterion below, provide:
1. Score (0-100)
2. Status (excellent/good/needs-work/poor)
3. Specific recommendation
4. Example improvement (if applicable)

Evaluate these aspects:

1. MAIN QUESTION QUALITY
   - Is the H1/title question-focused?
   - Does it target user search intent?
   - Is it compelling and click-worthy?

2. DIRECT ANSWER QUALITY
   - Is there a concise answer at the beginning?
   - Is it 1-2 sentences, under 300 characters?
   - Does it directly address the main question?

3. TL;DR SUMMARY QUALITY
   - Is there a summary section?
   - Are bullet points valuable and actionable?
   - Does it capture key takeaways?

4. VISUAL RELEVANCE
   - Are images/diagrams present?
   - Do they support the content meaningfully?
   - Are they well-described with alt text?

5. CTA EFFECTIVENESS
   - Is there a clear call-to-action?
   - Is it contextually relevant?
   - Does it provide clear next steps?

6. FORMATTING QUALITY
   - Proper heading hierarchy (H1, H2, H3)?
   - Use of bullet points and lists?
   - One idea per paragraph?
   - Easy to scan?

7. CITATION QUALITY
   - Are sources cited?
   - Are statistics backed up?
   - Links to authoritative sources?

8. AI-FRIENDLINESS
   - Optimized for AI chatbot consumption?
   - Clear, structured information?
   - Natural language that AI can parse?

Also provide:
- 3 key STRENGTHS
- 3 key IMPROVEMENTS needed
- Overall Score (0-100)

Return your analysis in this EXACT JSON format (no markdown, just raw JSON):
{
  "overallScore": 75,
  "mainQuestionQuality": {
    "score": 80,
    "status": "good",
    "recommendation": "Your title could be more question-focused",
    "example": "What is the Best AI SEO Tool in 2025?"
  },
  "directAnswerQuality": {
    "score": 60,
    "status": "needs-work",
    "recommendation": "Add a concise 1-2 sentence answer at the beginning",
    "example": "AI SEO tools help optimize content for both search engines and AI chatbots by focusing on structured data and natural language."
  },
  "tldrQuality": {
    "score": 40,
    "status": "poor",
    "recommendation": "Add a TL;DR section with 3-5 key bullet points"
  },
  "visualRelevance": {
    "score": 70,
    "status": "good",
    "recommendation": "Images are present but could use better alt text"
  },
  "ctaEffectiveness": {
    "score": 50,
    "status": "needs-work",
    "recommendation": "Add a clear call-to-action with next steps"
  },
  "formattingQuality": {
    "score": 85,
    "status": "excellent",
    "recommendation": "Good heading hierarchy and use of lists"
  },
  "citationQuality": {
    "score": 45,
    "status": "needs-work",
    "recommendation": "Add citations and link to authoritative sources"
  },
  "aiFriendliness": {
    "score": 70,
    "status": "good",
    "recommendation": "Content is well-structured for AI consumption"
  },
  "strengths": [
    "Clear heading hierarchy makes content scannable",
    "Good use of bullet points for key information",
    "Professional tone and well-written prose"
  ],
  "improvements": [
    "Add a TL;DR summary section at the beginning",
    "Include more data-backed citations and statistics",
    "Create a stronger, question-focused main title"
  ]
}

CRITICAL: Return ONLY the JSON object, no additional text, no markdown code blocks, just the raw JSON.
`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Try to parse JSON from response
    try {
      // Remove markdown code blocks if present
      const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const analysis = JSON.parse(jsonText);

      // Add timestamp
      analysis.analyzedAt = new Date().toISOString();

      return analysis;
    } catch (error) {
      console.error('Failed to parse Gemini response as JSON:', text);

      // Return a fallback structure
      return {
        overallScore: 50,
        mainQuestionQuality: {
          score: 50,
          status: 'needs-work',
          recommendation: 'Unable to analyze - please try again',
        },
        directAnswerQuality: {
          score: 50,
          status: 'needs-work',
          recommendation: 'Unable to analyze - please try again',
        },
        tldrQuality: {
          score: 50,
          status: 'needs-work',
          recommendation: 'Unable to analyze - please try again',
        },
        visualRelevance: {
          score: 50,
          status: 'needs-work',
          recommendation: 'Unable to analyze - please try again',
        },
        ctaEffectiveness: {
          score: 50,
          status: 'needs-work',
          recommendation: 'Unable to analyze - please try again',
        },
        formattingQuality: {
          score: 50,
          status: 'needs-work',
          recommendation: 'Unable to analyze - please try again',
        },
        citationQuality: {
          score: 50,
          status: 'needs-work',
          recommendation: 'Unable to analyze - please try again',
        },
        aiFriendliness: {
          score: 50,
          status: 'needs-work',
          recommendation: 'Unable to analyze - please try again',
        },
        strengths: ['Analysis in progress...'],
        improvements: ['Analysis in progress...'],
        analyzedAt: new Date().toISOString(),
        error: 'Failed to parse AI response',
      };
    }
  }
}

// Export singleton instance
export default new GeminiService();
