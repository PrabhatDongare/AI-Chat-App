# AI Chat App

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PrabhatDongare/AI-Chat-App.git
   cd "AI Chat App"
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Add gemini api key VITE_GEMINI_API_KEY 

4. **Start the application**
   ```bash
   pnpm dev
   ```


### Building for Production
```bash
pnpm run build
pnpm run preview
```

## Features
- Gemini LLM for iteration
- Responsive web app
- User can add new session, rename, delete session
- Error Handling
- Retry mechanism on failure
- Switch between chats
- Chats stored in Localstorage
- Export chats in JSON format
- Timestamp shown for user messages
- Markdown parser for AI response
- Key feature to send message & enter new line
