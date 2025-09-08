# ROI Tracker Agent

An AI-powered ROI tracking tool for project managers that analyzes project documents and provides leading/lagging indicators along with actionable recommendations.

## Features

- **Document Upload**: Drag-and-drop interface for uploading project documents (PDF, DOC, DOCX, TXT)
- **AI Analysis**: Uses OpenAI GPT-4 to analyze documents and extract ROI insights
- **Leading Indicators**: Early signals of project success (adoption, engagement, capability uptake)
- **Lagging Indicators**: Final outcomes (cost savings, productivity, retention)
- **Actionable Recommendations**: Specific next steps with priority levels
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS

## Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the app directory:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Upload a project document using the drag-and-drop interface
2. Wait for AI analysis to complete
3. Review the generated leading and lagging indicators
4. Follow the actionable recommendations
5. Upload new documents to track project progress over time

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4
- **Icons**: Lucide React
- **File Handling**: Formidable

## Project Structure

```
app/
├── src/
│   ├── app/
│   │   ├── api/analyze/route.js    # AI analysis endpoint
│   │   ├── layout.js               # Root layout
│   │   └── page.js                 # Main ROI tracker interface
│   └── globals.css                 # Global styles
├── package.json
└── README.md
```

## API Endpoints

- `POST /api/analyze` - Analyzes uploaded documents and returns ROI indicators

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
