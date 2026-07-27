# Deployment Guide - TOPFEROS MD

## Prerequisites

- Node.js >= 20.0.0
- npm >= 9.0.0
- MongoDB Atlas account
- API keys (OpenAI, Gemini, etc.)

## Local Deployment

### 1. Clone Repository

```bash
git clone https://github.com/T-O-P-F-E-R-O-S-MD/TOPFEROS-MD.git
cd TOPFEROS-MD
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

```bash
cp .env.example .env
```

Fill in your `.env` file:

```env
# Bot
BOT_NAME=TOPFEROS MD
BOT_VERSION=1.0.0
PREFIX=.
MODE=public

# Server
PORT=3000
TIMEZONE=America/Port-au-Prince

# Owner
OWNER_NAME=Your Name
OWNER_NUMBER=509XXXXXXXX

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/topferos

# APIs
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
GROQ_API_KEY=...

# Security
JWT_SECRET=your_secret_key
SESSION_SECRET=your_session_secret

# Features
AUTO_READ=true
WELCOME=true
```

### 4. Run Tests

```bash
npm test
```

### 5. Start Bot

```bash
# Development
npm run dev

# Production
npm start
```

## Cloud Deployment

### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create topferos-md

# Add environment variables
heroku config:set BOT_NAME="TOPFEROS MD"
heroku config:set MONGODB_URI="your_mongodb_uri"

# Deploy
git push heroku main
```

### Railway

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically

### Render

1. Create new Web Service
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### VPS (Ubuntu/Debian)

```bash
# SSH into server
ssh user@your-server

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/T-O-P-F-E-R-O-S-MD/TOPFEROS-MD.git
cd TOPFEROS-MD

# Install dependencies
npm install

# Create .env
nano .env

# Use PM2 for process management
npm install -g pm2
pm2 start start.js --name "topferos-md"
pm2 save
pm2 startup
```

## Docker Deployment

### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  bot:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    volumes:
      - ./sessions:/app/sessions
```

## Monitoring

### Health Check

```bash
curl http://localhost:3000/health
```

### Logs

```bash
# PM2
pm2 logs topferos-md

# Docker
docker logs topferos-md
```

## Troubleshooting

### Bot not connecting

- Check WhatsApp connection
- Verify session files
- Check console for errors

### Database errors

- Verify MongoDB URI
- Check network connectivity
- Ensure database exists

### API failures

- Verify API keys
- Check rate limits
- Review error logs

---

© TOPFEROS TECH - Ready to deploy!
