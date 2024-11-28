# GreatRace.gg

Transform your iRacing victories into stunning certificates and collectible achievement graphics.

## Features

- Beautiful achievement certificates for your race victories
- One-click downloads and social sharing
- Track-specific designs and layouts
- Collectible achievement graphics (coming soon)

## Development

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/greatrace-gg.git
cd greatrace-gg
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a .env file:
\`\`\`
# Frontend
VITE_API_URL=http://localhost:3001/api
VITE_IRACING_CLIENT_ID=your-client-id
VITE_REDIRECT_URI=http://localhost:5173/callback

# Backend
PORT=3001
SESSION_SECRET=your-session-secret
REDIS_URL=redis://localhost:6379
IRACING_CLIENT_ID=your-client-id
IRACING_CLIENT_SECRET=your-client-secret
IRACING_REDIRECT_URI=http://localhost:5173/callback
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## Deployment

The project is configured for deployment on Railway:

1. Frontend: Static site hosting
2. Backend: Node.js service
3. Redis: Managed Redis instance

### Environment Variables

Make sure to set these environment variables in your Railway project:

- \`PORT\`
- \`SESSION_SECRET\`
- \`REDIS_URL\`
- \`IRACING_CLIENT_ID\`
- \`IRACING_CLIENT_SECRET\`
- \`IRACING_REDIRECT_URI\`

## License

MIT