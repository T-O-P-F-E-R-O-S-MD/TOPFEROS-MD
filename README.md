# 🦁 TOPFEROS MD

> A powerful WhatsApp Multi-Device Bot built with Baileys, AI, plugins, and modern features.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![MIT License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/T-O-P-F-E-R-O-S-MD/TOPFEROS-MD)](https://github.com/T-O-P-F-E-R-O-S-MD/TOPFEROS-MD/issues)
[![GitHub Stars](https://img.shields.io/github/stars/T-O-P-F-E-R-O-S-MD/TOPFEROS-MD)](https://github.com/T-O-P-F-E-R-O-S-MD/TOPFEROS-MD)

## ✨ Features

- 🤖 **AI Integration** - OpenAI, Gemini, Groq support
- 🎮 **Rich Commands** - 50+ commands
- 🔌 **Plugin System** - Easily extendable
- 👥 **Group Management** - Kick, add, promote, demote
- 🎵 **Media Download** - YouTube, TikTok, Facebook
- 🔐 **Security** - Helmet, JWT, rate limiting
- 💾 **Database** - MongoDB integration
- 🌐 **Multi-Language** - Support lang yo
- 🧪 **Well Tested** - Jest coverage
- 📚 **Documentation** - Complete guides

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm >= 9.0.0
- MongoDB Atlas account

### Installation

```bash
# Clone repository
git clone https://github.com/T-O-P-F-E-R-O-S-MD/TOPFEROS-MD.git
cd TOPFEROS-MD

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Run tests
npm test

# Start bot
npm start
```

## 📖 Documentation

- [Deployment Guide](DEPLOYMENT.md) - Deploy to production
- [Security Policy](SECURITY.md) - Security best practices
- [Contributing Guide](CONTRIBUTING.md) - How to contribute

## 🎯 Available Commands

### General
```
.ping - Check bot response time
.alive - Show bot status
.menu - Display command menu
```

### Group Management
```
.group kick @user - Remove member
.group add 509XXXXXXXX - Add member
.group promote @user - Make admin
.group demote @user - Remove admin
.group tagall - Tag all members
```

### AI
```
.ai <prompt> - Ask AI
.gemini <prompt> - Use Gemini
.gpt <prompt> - Use GPT
```

### Media
```
.play <song> - Download music
.ytmp3 <url> - YouTube to MP3
.ytmp4 <url> - YouTube to MP4
.tiktok <url> - TikTok download
.facebook <url> - Facebook download
```

## 📁 Project Structure

```
TOPFEROS-MD/
├── backend/
│   └── src/
│       ├── commands/        # Bot commands
│       ├── plugins/         # Plugin system
│       ├── config/          # Configuration
│       ├── connection/      # WhatsApp connection
│       ├── database/        # Database logic
│       ├── models/          # MongoDB schemas
│       ├── security/        # Security functions
│       ├── handlers/        # Message handlers
│       ├── middleware/      # Express middleware
│       ├── routes/          # API routes
│       ├── services/        # Business logic
│       ├── utils/           # Utilities
│       ├── __tests__/       # Tests
│       ├── app.js           # Express app
│       └── index.js         # Entry point
├── sessions/                # WhatsApp sessions (git ignored)
├── .env.example             # Environment template
├── .eslintrc.json           # ESLint config
├── jest.config.js           # Jest config
├── package.json             # Dependencies
├── start.js                 # Start script
└── README.md                # This file
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🔐 Environment Variables

See `.env.example` for all available variables:

```env
# Bot Configuration
BOT_NAME=TOPFEROS MD
BOT_VERSION=1.0.0
PREFIX=.
MODE=public

# Owner Info
OWNER_NAME=TOPFEROS TECH
OWNER_NUMBER=50900000000

# Server
PORT=3000
TIMEZONE=America/Port-au-Prince

# Database
DATABASE=mongodb
MONGODB_URI=mongodb+srv://...

# API Keys
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
GROQ_API_KEY=...

# Security
JWT_SECRET=your_secret
SESSION_SECRET=your_session_secret
```

## 🛠️ Development

### Start Development Server

```bash
npm run dev
```

This uses nodemon for auto-reload.

### Code Quality

```bash
# Check code style
npm run lint

# Fix formatting
npm run lint:fix
```

## 🚀 Deployment

For production deployment, see [DEPLOYMENT.md](DEPLOYMENT.md)

Supported platforms:
- ✅ Heroku
- ✅ Railway
- ✅ Render
- ✅ VPS (Ubuntu/Debian)
- ✅ Docker

## 📞 Support

- 📧 Email: support@topferos-tech.com
- 💬 Discord: Coming soon
- 📱 WhatsApp: +509 XXXXXXXX
- 🐛 Issues: [GitHub Issues](https://github.com/T-O-P-F-E-R-O-S-MD/TOPFEROS-MD/issues)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details

## ⚠️ Disclaimer

This bot is not affiliated with WhatsApp or Meta. Use at your own risk.

---

**Made with ❤️ by [TOPFEROS TECH](https://github.com/T-O-P-F-E-R-O-S-MD)**

🌟 If you like this project, please give it a star!
