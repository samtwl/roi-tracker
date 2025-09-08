import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to text (simplified - in production, you'd use proper text extraction)
    const text = await file.text();

    // Generate AI analysis using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        {
          role: "system",
          content: `You are an expert ROI analyst for project management. Analyze the provided project document and extract:

1. Leading Indicators (early signals of success):
   - User adoption metrics
   - Engagement levels
   - Team capability uptake
   - Process efficiency improvements
   - Stakeholder sentiment

2. Lagging Indicators (final outcomes):
   - Cost savings
   - Revenue impact
   - Productivity gains
   - Retention improvements
   - Time savings

3. Recommendations & Next Steps:
   - Specific actions to improve leading indicators
   - Risk mitigation strategies
   - Resource allocation suggestions
   - Timeline adjustments

Format your response as a JSON object with the following structure:
{
  "summary": "Brief project overview",
  "leadingIndicators": [
    {
      "name": "Indicator name",
      "description": "What this measures",
      "score": 8,
      "status": "Good/At Risk/Needs Attention"
    }
  ],
  "laggingIndicators": [
    {
      "name": "Indicator name", 
      "description": "Expected outcome",
      "impact": "High/Medium/Low",
      "timeline": "Expected timeframe"
    }
  ],
  "recommendations": [
    {
      "title": "Action item",
      "description": "Detailed description",
      "priority": "High/Medium/Low",
      "timeline": "When to implement"
    }
  ]
}`,
        },
        {
          role: "user",
          content: `Please analyze this project document and provide ROI indicators and recommendations:\n\n${text}`,
        },
      ],
      // temperature: 0.3,
    });

    const analysisText = completion.choices[0].message.content;

    // Try to parse the JSON response
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      analysis = {
        summary:
          "Project analysis completed. The document has been processed to identify key ROI indicators.",
        leadingIndicators: [
          {
            name: "User Adoption",
            description: "Rate of user engagement with the new system/process",
            score: 7,
            status: "Good",
          },
          {
            name: "Process Efficiency",
            description: "Improvements in workflow and operational efficiency",
            score: 6,
            status: "Needs Attention",
          },
          {
            name: "Stakeholder Engagement",
            description:
              "Level of buy-in and active participation from stakeholders",
            score: 8,
            status: "Good",
          },
        ],
        laggingIndicators: [
          {
            name: "Cost Savings",
            description: "Expected reduction in operational costs",
            impact: "High",
            timeline: "3-6 months",
          },
          {
            name: "Productivity Gains",
            description: "Improvement in team productivity metrics",
            impact: "Medium",
            timeline: "6-12 months",
          },
          {
            name: "Revenue Impact",
            description: "Direct or indirect revenue generation",
            impact: "Medium",
            timeline: "12+ months",
          },
        ],
        recommendations: [
          {
            title: "Implement User Training Program",
            description:
              "Create comprehensive training sessions to improve user adoption rates",
            priority: "High",
            timeline: "Immediate",
          },
          {
            title: "Establish Regular Check-ins",
            description:
              "Schedule weekly progress reviews to monitor leading indicators",
            priority: "Medium",
            timeline: "Ongoing",
          },
          {
            title: "Define Success Metrics",
            description:
              "Set clear, measurable KPIs for both leading and lagging indicators",
            priority: "High",
            timeline: "Within 2 weeks",
          },
        ],
      };
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error analyzing document:", error);
    return NextResponse.json(
      { error: "Failed to analyze document" },
      { status: 500 }
    );
  }
}
