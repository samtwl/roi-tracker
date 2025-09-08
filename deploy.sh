#!/bin/bash

# ROI Tracker Agent - Quick Deploy Script
echo "🚀 ROI Tracker Agent Deployment Script"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the app directory"
    echo "Usage: cd /Users/sam/Projects/roi-tracker/app && ./deploy.sh"
    exit 1
fi

echo "📋 Pre-deployment checklist:"
echo "1. ✅ Next.js application ready"
echo "2. ✅ Package.json configured"
echo "3. ✅ API routes implemented"

# Check if OPENAI_API_KEY is set locally
if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  Warning: OPENAI_API_KEY not found in local environment"
    echo "   Make sure to set it in your hosting platform!"
else
    echo "4. ✅ OpenAI API key detected locally"
fi

echo ""
echo "🎯 Choose your deployment platform:"
echo "1. Vercel (Recommended - Free & Easy)"
echo "2. Netlify (Alternative - Also Free)"
echo "3. Railway (Simple & Affordable)"
echo "4. Manual deployment instructions"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🔥 Deploying to Vercel..."
        echo "=========================="
        
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "🚀 Starting Vercel deployment..."
        echo "Follow the prompts:"
        echo "- Link to existing project? No"
        echo "- Project name: roi-tracker-agent (or your preferred name)"
        echo "- Directory: ./"
        echo "- Override settings? No"
        
        vercel
        
        echo ""
        echo "🔑 Don't forget to add your OpenAI API key:"
        echo "Run: vercel env add OPENAI_API_KEY"
        echo "Then: vercel --prod"
        ;;
        
    2)
        echo ""
        echo "🌟 Deploying to Netlify..."
        echo "=========================="
        
        # Check if Netlify CLI is installed
        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        echo "Building application..."
        npm run build
        
        echo "🚀 Starting Netlify deployment..."
        netlify deploy --prod --dir=.next
        
        echo ""
        echo "🔑 Don't forget to add your OpenAI API key in Netlify dashboard:"
        echo "Site settings > Environment variables > Add OPENAI_API_KEY"
        ;;
        
    3)
        echo ""
        echo "🚂 Railway Deployment Instructions:"
        echo "==================================="
        echo "1. Go to https://railway.app"
        echo "2. Sign up/login with GitHub"
        echo "3. Click 'New Project' > 'Deploy from GitHub repo'"
        echo "4. Select your roi-tracker repository"
        echo "5. Add environment variable: OPENAI_API_KEY"
        echo "6. Railway will automatically deploy!"
        ;;
        
    4)
        echo ""
        echo "📖 Manual Deployment Options:"
        echo "============================="
        echo "Check the deploy-instructions.md file for detailed guides on:"
        echo "- Vercel deployment"
        echo "- Netlify deployment"
        echo "- Railway deployment"
        echo "- Heroku deployment"
        echo "- Custom domain setup"
        ;;
        
    *)
        echo "❌ Invalid choice. Please run the script again and choose 1-4."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process started!"
echo "📚 For detailed instructions, check: deploy-instructions.md"
echo "🔗 Your app will be available at the provided URL"
echo ""
echo "📊 Next Steps:"
echo "1. Test your deployed application"
echo "2. Upload a sample document to verify functionality"
echo "3. Monitor OpenAI API usage in your dashboard"
echo "4. Consider setting up a custom domain"
echo ""
echo "💡 Need help? Check the troubleshooting section in deploy-instructions.md"
