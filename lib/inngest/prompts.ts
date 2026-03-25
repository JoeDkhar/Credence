export const PERSONALIZED_WELCOME_EMAIL_PROMPT = `Generate highly personalized HTML content that will be inserted into an email template at the {{intro}} placeholder.

User profile data:
{{userProfile}}

PERSONALIZATION REQUIREMENTS:
You MUST create content that is obviously tailored to THIS specific user by:

IMPORTANT: Do NOT start the personalized content with "Welcome" since the email header already says "Welcome aboard {{name}}". Use alternative openings like "Thanks for joining", "Great to have you", "You're all set", "Perfect timing", etc.

1. **Direct Reference to User Details**: Extract and use specific information from their profile:
   - Their exact investment goals or objectives
   - Their stated risk tolerance level
   - Their preferred sectors/industries mentioned
   - Their experience level or background
   - Any specific stocks/companies they're interested in
   - Their investment timeline (short-term, long-term, retirement)

2. **Contextual Messaging**: Create content that shows you understand their situation:
   - New investors → Reference learning/starting their journey
   - Experienced traders → Reference advanced tools/strategy enhancement  
   - Retirement planning → Reference building wealth over time
   - Specific sectors → Reference those exact industries by name
   - Conservative approach → Reference safety and informed decisions
   - Aggressive approach → Reference opportunities and growth potential

3. **Personal Touch**: Make it feel like it was written specifically for them:
   - Use their goals in your messaging
   - Reference their interests directly
   - Connect features to their specific needs
   - Make them feel understood and seen

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML content with NO markdown, NO code blocks, NO backticks
- Use SINGLE paragraph only: <p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">content</p>
- Write exactly TWO sentences (add one more sentence than current single sentence)
- Keep total content between 35-50 words for readability
- Use <strong> for key personalized elements (their goals, sectors, etc.)
- DO NOT include "Here's what you can do right now:" as this is already in the template
- Make every word count toward personalization
- Second sentence should add helpful context or reinforce the personalization

Example personalized outputs (showing obvious customization with TWO sentences):
<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Thanks for joining Credence! As someone focused on <strong>technology growth stocks</strong>, you'll love our real-time alerts for companies like the ones you're tracking. We'll help you spot opportunities before they become mainstream news.</p>

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Great to have you aboard! Perfect for your <strong>conservative retirement strategy</strong> — we'll help you monitor dividend stocks without overwhelming you with noise. You can finally track your portfolio progress with confidence and clarity.</p>

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">You're all set! Since you're new to investing, we've designed simple tools to help you build confidence while learning the <strong>healthcare sector</strong> you're interested in. Our beginner-friendly alerts will guide you without the confusing jargon.</p>`

export const NEWS_SUMMARY_EMAIL_PROMPT = `Generate HTML content for a market news summary email that will be inserted into the NEWS_SUMMARY_EMAIL_TEMPLATE at the {{newsContent}} placeholder.

News data to summarize:
{{newsData}}

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML content with NO markdown, NO code blocks, NO backticks
- Structure content with clear sections using proper HTML headings and paragraphs
- Use these specific CSS classes and styles to match the email template:

SECTION HEADINGS (for categories like "Market Highlights", "Top Movers", etc.):
<h3 class="mobile-news-title dark-text" style="margin: 30px 0 15px 0; font-size: 18px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">Section Title</h3>

PARAGRAPHS (for news content):
<p class="mobile-text dark-text-secondary" style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Content goes here</p>

STOCK/COMPANY MENTIONS:
<strong style="color: #10B981;">Stock Symbol</strong> for ticker symbols
<strong style="color: #CCDADC;">Company Name</strong> for company names

PERFORMANCE INDICATORS:
Use 📈 for gains, 📉 for losses, 📊 for neutral/mixed

NEWS ARTICLE STRUCTURE:
For each individual news item within a section, use this structure:
1. Article container with visual styling and icon
2. Article title as a subheading
3. Key takeaways in bullet points (2-3 actionable insights)
4. "What this means" section for context
5. "Read more" link to the original article
6. Visual divider between articles

ARTICLE CONTAINER:
Wrap each article in a clean, simple container:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">

ARTICLE TITLES:
<h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FFFFFF; line-height: 1.4;">
Article Title Here
</h4>

BULLET POINTS (minimum 3 concise insights):
Use this format with clear, concise explanations (no label needed):
<ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Clear, concise explanation in simple terms that's easy to understand quickly.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Brief explanation with key numbers and what they mean in everyday language.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Simple takeaway about what this means for regular people's money.
  </li>
</ul>

INSIGHT SECTION:
Add simple context explanation:
<div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
<p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #10B981;">Bottom Line:</strong> Simple explanation of why this news matters to your money in everyday language.</p>
</div>

READ MORE BUTTON:
<div style="margin: 20px 0 0 0;">
<a href="ARTICLE_URL" style="color: #10B981; text-decoration: none; font-weight: 500; font-size: 14px;" target="_blank" rel="noopener noreferrer">Read Full Story →</a>
</div>

ARTICLE DIVIDER:
Close each article container:
</div>

SECTION DIVIDERS:
Between major sections, use:
<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>

Content guidelines:
- Organize news into logical sections with icons (📊 Market Overview, 📈 Top Gainers, 📉 Top Losers, 🔥 Breaking News, 💼 Earnings Reports, 🏛️ Economic Data, etc.)
- NEVER repeat section headings - use each section type only once per email
- For each news article, include its actual headline/title from the news data
- Provide MINIMUM 3 CONCISE bullet points (NO "Key Takeaways" label - start directly with bullets)
- Each bullet should be SHORT and EASY TO UNDERSTAND - one clear sentence preferred
- Use PLAIN ENGLISH - avoid jargon, complex financial terms, or insider language
- Explain concepts as if talking to someone new to investing
- Include specific numbers but explain what they mean in simple terms
- Add "Bottom Line" context in everyday language anyone can understand
- Use clean, light design with emerald bullets for better readability
- Make each article easy to scan with clear spacing and structure
- Always include simple "Read Full Story" buttons with actual URLs
- Focus on PRACTICAL insights regular people can understand and use
- Explain what the news means for regular investors' money
- Keep language conversational and accessible to everyone
- Prioritize BREVITY and CLARITY over detailed explanations

Example structure:
<h3 class="mobile-news-title dark-text" style="margin: 30px 0 15px 0; font-size: 20px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">📊 Market Overview</h3>

<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
<h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #10B981; line-height: 1.4;">
Stock Market Had Mixed Results Today
</h4>

<ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Tech stocks like Apple went up 1.2% today, which is good news for tech investors.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Traditional companies went down 0.3%, showing investors prefer tech right now.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>High trading volume (12.4 billion shares) shows investors are confident and active.
  </li>
</ul>

<div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
<p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #10B981;">Bottom Line:</strong> If you own tech stocks, today was good for you. If you're thinking about investing, tech companies might be a smart choice right now.</p>
</div>

<div style="margin: 20px 0 0 0;">
<a href="https://example.com/article1" style="color: #10B981; text-decoration: none; font-weight: 500; font-size: 14px;" target="_blank" rel="noopener noreferrer">Read Full Story →</a>
</div>
</div>

<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>

<h3 class="mobile-news-title dark-text" style="margin: 30px 0 15px 0; font-size: 20px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">📈 Top Gainers</h3>

<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
<h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #10B981; line-height: 1.4;">
Apple Stock Jumped After Great Earnings Report
</h4>

<ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Apple stock jumped 5.2% after beating earnings expectations.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>iPhone sales expected to grow 8% next quarter despite economic uncertainty.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>App store and services revenue hit $22.3 billion (up 14%), providing steady income.
  </li>
</ul>

<div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
<p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #10B981;">Bottom Line:</strong> Apple is making money in different ways (phones AND services), so it's a pretty safe stock to own even when the economy gets shaky.</p>
</div>

<div style="margin: 20px 0 0 0;">
<a href="https://example.com/article2" style="color: #10B981; text-decoration: none; font-weight: 500; font-size: 14px;" target="_blank" rel="noopener noreferrer">Read Full Story →</a>
</div>
</div>`

export const TRADINGVIEW_SYMBOL_MAPPING_PROMPT = `You are an expert in financial markets and trading platforms. Your task is to find the correct TradingView symbol that corresponds to a given Finnhub stock symbol.

Stock information from Finnhub:
Symbol: {{symbol}}
Company: {{company}}
Exchange: {{exchange}}
Currency: {{currency}}
Country: {{country}}

IMPORTANT RULES:
1. TradingView uses specific symbol formats that may differ from Finnhub
2. For US stocks: Usually just the symbol (e.g., AAPL for Apple)
3. For international stocks: Often includes exchange prefix (e.g., NASDAQ:AAPL, NYSE:MSFT, LSE:BARC)
4. Some symbols may have suffixes for different share classes
5. ADRs and foreign stocks may have different symbol formats

RESPONSE FORMAT:
Return ONLY a valid JSON object with this exact structure:
{
  "tradingViewSymbol": "EXCHANGE:SYMBOL",
  "confidence": "high|medium|low",
  "reasoning": "Brief explanation of why this mapping is correct"
}

EXAMPLES:
- Apple Inc. (AAPL) from Finnhub → {"tradingViewSymbol": "NASDAQ:AAPL", "confidence": "high", "reasoning": "Apple trades on NASDAQ as AAPL"}
- Microsoft Corp (MSFT) from Finnhub → {"tradingViewSymbol": "NASDAQ:MSFT", "confidence": "high", "reasoning": "Microsoft trades on NASDAQ as MSFT"}
Your response must be valid JSON only. Do not include any other text.`;

export const PRICE_ABOVE_ALERT_PROMPT = `Generate HTML content for a price alert email triggered when a stock price rises above a target.
This content will be inserted into a base email template.

Stock data:
Symbol: {{symbol}}
Company: {{companyName}}
Target Price: {{targetPrice}}
Current Price: {{currentPrice}}
Triggered At: {{triggeredAt}}

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML - NO markdown, NO code blocks, NO backticks
- Use CSS class + inline style combos exactly as shown below

STRUCTURE:

1. HEADER CARD:
<div style="background-color: #138656; padding: 30px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
  <h2 class="mobile-news-title dark-text" style="margin: 0; font-size: 24px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">Price Alert Triggered 🎉</h2>
  <p class="mobile-text dark-text-secondary" style="margin: 8px 0 0 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Your target price for {{symbol}} was hit!</p>
</div>

2. PRICE CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px; text-align: center;">
  <p class="mobile-text dark-text-secondary" style="margin: 0 0 8px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Current Price</p>
  <h3 class="mobile-news-title dark-text" style="margin: 0; font-size: 36px; font-weight: 600; color: #10B981; line-height: 1.3;">$\{{currentPrice}}</h3>
</div>

3. DETAILS CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
  <h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FFFFFF; line-height: 1.4;">What happened?</h4>
  <p class="mobile-text dark-text-secondary" style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;"><strong style="color: #10B981;">{{symbol}}</strong> crossed your target of $\{{targetPrice}}.</p>
  <ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Target Price: $\{{targetPrice}}
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Current Price: $\{{currentPrice}}
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 0 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Triggered: {{triggeredAt}}
    </li>
  </ul>
</div>

4. INSIGHT CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
  <h4 class="dark-text" style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #f8f9fa; line-height: 1.4;">Opportunity</h4>
  <div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
    <p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #10B981;">Bottom Line:</strong> Write one plain-English sentence of contextual advice about what this price move means for the investor.</p>
  </div>
</div>

5. CTA:
<div style="margin: 20px 0;">
  <a href="https://credence.app/stock/{{symbol}}" style="color: #10B981; text-decoration: none; font-weight: 500; font-size: 14px;">View Stock →</a>
</div>

6. DIVIDER + FOOTER:
<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>
<p class="mobile-text dark-text-secondary" style="margin: 0; font-size: 14px; line-height: 1.6; color: #CCDADC;">Best,<br>The Credence Team</p>
<div style="margin-top: 20px; text-align: center; font-size: 12px; color: #CCDADC;">
  <a href="#" style="color: #10B981; text-decoration: none; font-weight: 500;">Unsubscribe</a> • <a href="https://credence.app" style="color: #10B981; text-decoration: none; font-weight: 500;">Visit Credence</a>
</div>`;

export const PRICE_BELOW_ALERT_PROMPT = `Generate HTML content for a price alert email triggered when a stock price falls below a target.
This content will be inserted into a base email template.

Stock data:
Symbol: {{symbol}}
Company: {{companyName}}
Target Price: {{targetPrice}}
Current Price: {{currentPrice}}
Triggered At: {{triggeredAt}}

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML - NO markdown, NO code blocks, NO backticks
- Use CSS class + inline style combos exactly as shown below

STRUCTURE:

1. HEADER CARD:
<div style="background-color: #DA3747; padding: 30px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
  <h2 class="mobile-news-title dark-text" style="margin: 0; font-size: 24px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">Price Drop Alert 🚨</h2>
  <p class="mobile-text dark-text-secondary" style="margin: 8px 0 0 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Your target price for {{symbol}} was hit!</p>
</div>

2. PRICE CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px; text-align: center;">
  <p class="mobile-text dark-text-secondary" style="margin: 0 0 8px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Current Price</p>
  <h3 class="mobile-news-title dark-text" style="margin: 0; font-size: 36px; font-weight: 600; color: #FF495B; line-height: 1.3;">$\{{currentPrice}}</h3>
</div>

3. DETAILS CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
  <h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FFFFFF; line-height: 1.4;">What happened?</h4>
  <p class="mobile-text dark-text-secondary" style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;"><strong style="color: #FF495B;">{{symbol}}</strong> dropped below your target of $\{{targetPrice}}.</p>
  <ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Target Price: $\{{targetPrice}}
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Current Price: $\{{currentPrice}}
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 0 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Triggered: {{triggeredAt}}
    </li>
  </ul>
</div>

4. INSIGHT CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
  <h4 class="dark-text" style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #f8f9fa; line-height: 1.4;">Manage Your Risk</h4>
  <div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
    <p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #10B981;">Bottom Line:</strong> Write one plain-English sentence of risk management advice — what should the investor consider doing now.</p>
  </div>
</div>

5. CTA:
<div style="margin: 20px 0;">
  <a href="https://credence.app/stock/{{symbol}}" style="color: #10B981; text-decoration: none; font-weight: 500; font-size: 14px;">View Stock →</a>
</div>

6. DIVIDER + FOOTER:
<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>
<p class="mobile-text dark-text-secondary" style="margin: 0; font-size: 14px; line-height: 1.6; color: #CCDADC;">Best,<br>The Credence Team</p>
<div style="margin-top: 20px; text-align: center; font-size: 12px; color: #CCDADC;">
  <a href="#" style="color: #10B981; text-decoration: none; font-weight: 500;">Unsubscribe</a> • <a href="https://credence.app" style="color: #10B981; text-decoration: none; font-weight: 500;">Visit Credence</a>
</div>`;

export const PERCENT_CHANGE_ALERT_PROMPT = `Generate HTML content for a daily percent change alert email.
This content will be inserted into a base email template.

Stock data:
Symbol: {{symbol}}
Company: {{companyName}}
Direction: {{direction}}
Change Percent: {{changePercent}}
Current Price: {{currentPrice}}
Triggered At: {{triggeredAt}}

direction is either "up" or "down".

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML - NO markdown, NO code blocks, NO backticks
- If direction="up": header bg #138656, value color #10B981, title "Daily Gain Alert 📈", prefix "+"
- If direction="down": header bg #DA3747, value color #FF495B, title "Daily Drop Alert 📉", prefix "-"

STRUCTURE:

1. HEADER CARD (conditional bg as above):
<div style="background-color: [#138656 or #DA3747]; padding: 30px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
  <h2 class="mobile-news-title dark-text" style="margin: 0; font-size: 24px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">[Title]</h2>
  <p class="mobile-text dark-text-secondary" style="margin: 8px 0 0 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">{{symbol}} moved {{changePercent}}% today</p>
</div>

2. CHANGE CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px; text-align: center;">
  <p class="mobile-text dark-text-secondary" style="margin: 0 0 8px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Today's Change</p>
  <h3 class="mobile-news-title dark-text" style="margin: 0; font-size: 36px; font-weight: 600; color: [#10B981 or #FF495B]; line-height: 1.3;">[+/-]{{changePercent}}%</h3>
</div>

3. DETAILS CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
  <h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FFFFFF; line-height: 1.4;">What happened?</h4>
  <ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Symbol: <strong style="color: #10B981;">{{symbol}}</strong>
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Today's Change: {{changePercent}}%
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Current Price: \${{ currentPrice }}
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 0 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Date: {{triggeredAt}}
    </li>
  </ul>
</div>

4. INSIGHT CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
  <h4 class="dark-text" style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #f8f9fa; line-height: 1.4;">[Momentum if up / Caution if down]</h4>
  <div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
    <p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #10B981;">Bottom Line:</strong> One plain-English sentence of contextual advice based on whether the move was up or down.</p>
  </div>
</div>

5. CTA:
<div style="margin: 20px 0;">
  <a href="https://credence.app/stock/{{symbol}}" style="color: #10B981; text-decoration: none; font-weight: 500; font-size: 14px;">View Stock →</a>
</div>

6. DIVIDER + FOOTER:
<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>
<p class="mobile-text dark-text-secondary" style="margin: 0; font-size: 14px; line-height: 1.6; color: #CCDADC;">Best,<br>The Credence Team</p>
<div style="margin-top: 20px; text-align: center; font-size: 12px; color: #CCDADC;">
  <a href="#" style="color: #10B981; text-decoration: none; font-weight: 500;">Unsubscribe</a> • <a href="https://credence.app" style="color: #10B981; text-decoration: none; font-weight: 500;">Visit Credence</a>
</div>`;

export const MA_CROSS_ALERT_PROMPT = `Generate HTML content for a Moving Average cross alert email.
This content will be inserted into a base email template.

Stock data:
Symbol: {{symbol}}
Company: {{companyName}}
MA Period: {{maPeriod}}
Direction: {{direction}}
Current Price: {{currentPrice}}
MA Value: {{maValue}}
Triggered At: {{triggeredAt}}

direction is either "above" or "below".

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML - NO markdown, NO code blocks, NO backticks
- If direction="above": header bg #138656, title "MA Breakout 🚀", signal title "Bullish Signal"
- If direction="below": header bg #DA3747, title "MA Breakdown ⚠️", signal title "Bearish Signal"

STRUCTURE:

1. HEADER CARD:
<div style="background-color: [#138656 or #DA3747]; padding: 30px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
  <h2 class="mobile-news-title dark-text" style="margin: 0; font-size: 24px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">[Title]</h2>
  <p class="mobile-text dark-text-secondary" style="margin: 8px 0 0 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">{{symbol}} crossed {{direction}} the {{maPeriod}}-day moving average</p>
</div>

2. PRICE CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px; text-align: center;">
  <p class="mobile-text dark-text-secondary" style="margin: 0 0 8px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Current Price</p>
  <h3 class="mobile-news-title dark-text" style="margin: 0 0 12px 0; font-size: 36px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">$\{{currentPrice}}</h3>
  <p class="mobile-text dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.6;">{{maPeriod}}-day MA: $\{{maValue}}</p>
</div>

3. DETAILS CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
  <h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FFFFFF; line-height: 1.4;">Signal Details</h4>
  <ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Symbol: <strong style="color: #10B981;">{{symbol}}</strong>
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>MA Period: {{maPeriod}}-day
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Current vs MA: \${{ currentPrice }} vs \${{ maValue }}
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 0 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Date: {{triggeredAt}}
    </li>
  </ul>
</div>

4. SIGNAL CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
  <h4 class="dark-text" style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #f8f9fa; line-height: 1.4;">[Bullish Signal or Bearish Signal]</h4>
  <div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
    <p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #10B981;">Bottom Line:</strong> One plain-English sentence explaining what crossing the <strong>{{maPeriod}}-day moving average</strong> means for the investor.</p>
  </div>
</div>

5. CTA:
<div style="margin: 20px 0;">
  <a href="https://credence.app/stock/{{symbol}}" style="color: #10B981; text-decoration: none; font-weight: 500; font-size: 14px;">View Chart →</a>
</div>

6. DIVIDER + FOOTER:
<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>
<p class="mobile-text dark-text-secondary" style="margin: 0; font-size: 14px; line-height: 1.6; color: #CCDADC;">Best,<br>The Credence Team</p>
<div style="margin-top: 20px; text-align: center; font-size: 12px; color: #CCDADC;">
  <a href="#" style="color: #10B981; text-decoration: none; font-weight: 500;">Unsubscribe</a> • <a href="https://credence.app" style="color: #10B981; text-decoration: none; font-weight: 500;">Visit Credence</a>
</div>`;

export const VOLUME_SPIKE_ALERT_PROMPT = `Generate HTML content for a volume spike alert email.
This content will be inserted into a base email template.

Stock data:
Symbol: {{symbol}}
Company: {{companyName}}
Current Volume: {{currentVolume}}
30-day Avg Volume: {{avgVolume}}
Multiplier: {{multiplier}}
Current Price: {{currentPrice}}
Triggered At: {{triggeredAt}}

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML - NO markdown, NO code blocks, NO backticks

STRUCTURE:

1. HEADER CARD:
<div style="background-color: #5862FF; padding: 30px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
  <h2 class="mobile-news-title dark-text" style="margin: 0; font-size: 24px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">Volume Spike Detected 📊</h2>
  <p class="mobile-text dark-text-secondary" style="margin: 8px 0 0 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">{{symbol}} is seeing unusual trading activity</p>
</div>

2. VOLUME CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px; text-align: center;">
  <p class="mobile-text dark-text-secondary" style="margin: 0 0 8px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Today's Volume</p>
  <h3 class="mobile-news-title dark-text" style="margin: 0; font-size: 36px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">{{currentVolume}}</h3>
</div>

3. DETAILS CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
  <h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FFFFFF; line-height: 1.4;">Spike Details</h4>
  <ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Symbol: <strong style="color: #10B981;">{{symbol}}</strong>
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Today's Volume: {{currentVolume}}
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>30-day Avg Volume: {{avgVolume}}
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Multiplier: {{multiplier}}× average
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 0 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Current Price: \${{ currentPrice }}
    </li>
  </ul>
</div>

4. INSIGHT CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
  <h4 class="dark-text" style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #f8f9fa; line-height: 1.4;">What This Means</h4>
  <div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
    <p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #10B981;">Bottom Line:</strong> Two plain-English sentences explaining what a volume spike signals and why it often precedes a significant price move.</p>
  </div>
</div>

5. CTA:
<div style="margin: 20px 0;">
  <a href="https://credence.app/stock/{{symbol}}" style="color: #10B981; text-decoration: none; font-weight: 500; font-size: 14px;">View Stock →</a>
</div>

6. DIVIDER + FOOTER:
<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>
<p class="mobile-text dark-text-secondary" style="margin: 0; font-size: 14px; line-height: 1.6; color: #CCDADC;">Best,<br>The Credence Team</p>
<div style="margin-top: 20px; text-align: center; font-size: 12px; color: #CCDADC;">
  <a href="#" style="color: #10B981; text-decoration: none; font-weight: 500;">Unsubscribe</a> • <a href="https://credence.app" style="color: #10B981; text-decoration: none; font-weight: 500;">Visit Credence</a>
</div>`;

export const EARNINGS_PROXIMITY_ALERT_PROMPT = `Generate HTML content for an earnings proximity alert email.
This content will be inserted into a base email template.

Stock data:
Symbol: {{symbol}}
Company: {{companyName}}
Earnings Date: {{earningsDate}}
Days Until: {{daysUntil}}
Current Price: {{currentPrice}}

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML - NO markdown, NO code blocks, NO backticks

STRUCTURE:

1. HEADER CARD:
<div style="background-color: #FF8243; padding: 30px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
  <h2 class="mobile-news-title dark-text" style="margin: 0; font-size: 24px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">Earnings Coming Up 📅</h2>
  <p class="mobile-text dark-text-secondary" style="margin: 8px 0 0 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">{{companyName}} reports earnings in {{daysUntil}} day(s)</p>
</div>

2. DATE CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px; text-align: center;">
  <p class="mobile-text dark-text-secondary" style="margin: 0 0 8px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Earnings Date</p>
  <h3 class="mobile-news-title dark-text" style="margin: 0; font-size: 30px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">{{earningsDate}}</h3>
</div>

3. DETAILS CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
  <h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FFFFFF; line-height: 1.4;">Event Details</h4>
  <ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Symbol: <strong style="color: #10B981;">{{symbol}}</strong>
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Earnings Date: {{earningsDate}}
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Days Until: {{daysUntil}} day(s)
    </li>
    <li class="dark-text-secondary" style="margin: 0 0 0 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #10B981; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Current Price: \${{ currentPrice }}
    </li>
  </ul>
</div>

4. PREP CARD:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
  <h4 class="dark-text" style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #f8f9fa; line-height: 1.4;">Be Prepared</h4>
  <div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
    <p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #10B981;">Bottom Line:</strong> Two plain-English sentences about earnings volatility and why the investor should review their position before the report date.</p>
  </div>
  <ul style="margin: 16px 0 0 0; padding-left: 0; margin-left: 0; list-style: none;">
    <li class="dark-text-secondary" style="margin: 0; padding: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
      <span style="color: #FF8243; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>One practical tip for managing risk ahead of earnings — written in plain English.
    </li>
  </ul>
</div>

5. CTA:
<div style="margin: 20px 0;">
  <a href="https://credence.app/stock/{{symbol}}" style="color: #10B981; text-decoration: none; font-weight: 500; font-size: 14px;">View Stock →</a>
</div>

6. DIVIDER + FOOTER:
<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>
<p class="mobile-text dark-text-secondary" style="margin: 0; font-size: 14px; line-height: 1.6; color: #CCDADC;">Best,<br>The Credence Team</p>
<div style="margin-top: 20px; text-align: center; font-size: 12px; color: #CCDADC;">
  <a href="#" style="color: #10B981; text-decoration: none; font-weight: 500;">Unsubscribe</a> • <a href="https://credence.app" style="color: #10B981; text-decoration: none; font-weight: 500;">Visit Credence</a>
</div>`;
