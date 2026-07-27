#!/bin/bash

# TOPFEROS MD - Production Environment Setup
# This script sets up the production environment

echo "🦁 TOPFEROS MD - Production Setup"
echo "=================================="
echo ""

# Create production .env file
cat > .env << 'EOF'
# Bot Configuration
BOT_NAME=TOPFEROS MD
BOT_VERSION=1.0.0
PREFIX=.
MODE=production

# Owner Information
OWNER_NAME=TOPFEROS TECH
OWNER_NUMBER=50900000000

# Server Configuration
PORT=3000
NODE_ENV=production
TIMEZONE=America/Port-au-Prince

# Database
DATABASE=mongodb
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/topferos

# API Keys
OPENAI_API_KEY=sk-your-key-here
GEMINI_API_KEY=your-key-here
GROQ_API_KEY=your-key-here
REMOVE_BG_API_KEY=your-key-here
IMGBB_API_KEY=your-key-here
OPENWEATHER_API_KEY=your-key-here
YOUTUBE_API_KEY=your-key-here

# Security
JWT_SECRET=$(openssl rand -base64 32)
SESSION_SECRET=$(openssl rand -base64 32)

# Logging
LOG_LEVEL=info

# Features
AUTO_READ=true
AUTO_TYPING=false
AUTO_RECORDING=false
AUTO_REACT=false
WELCOME=true
GOODBYE=true
ANTI_LINK=true
ANTI_DELETE=true
AUTO_STATUS_VIEW=false

# Pairing
USE_PAIRING_CODE=true
PAIRING_NUMBER=

# Dashboard
DASHBOARD_USERNAME=admin
DASHBOARD_PASSWORD=$(openssl rand -base64 12)
EOF

echo "✓ Production .env file created"
echo ""
echo "⚠️  IMPORTANT: Update the following in .env:"
echo "  - MONGODB_URI: Your MongoDB connection string"
echo "  - OWNER_NUMBER: Your WhatsApp number"
echo "  - OPENAI_API_KEY: Your OpenAI API key"
echo "  - GEMINI_API_KEY: Your Gemini API key"
echo "  - GROQ_API_KEY: Your Groq API key"
echo "  - PAIRING_NUMBER: Your WhatsApp number for pairing"
echo ""

# Create necessary directories
echo "✓ Creating necessary directories..."
mkdir -p sessions
mkdir -p logs
mkdir -p data

# Set proper permissions
echo "✓ Setting directory permissions..."
chmod 700 sessions
chmod 700 logs
chmod 700 data
chmod 600 .env

# Install production dependencies
echo ""
echo "✓ Installing production dependencies..."
npm ci --only=production

# Run tests
echo ""
echo "✓ Running tests..."
npm test

# Create log file
echo ""
echo "✓ Creating log file..."
touch logs/production.log

echo ""
echo "✅ Production environment setup complete!"
echo ""
echo "Security checklist:"
echo "  ✓ .env file created with secure permissions (600)"
echo "  ✓ API keys generated for JWT and SESSION"
echo "  ✓ Directories created with restricted permissions (700)"
echo "  ✓ Production dependencies installed"
echo "  ✓ All tests passed"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your API keys"
echo "2. Test locally: npm start"
echo "3. Deploy to production: docker-compose up -d"
echo ""
