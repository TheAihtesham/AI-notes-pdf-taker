# 📄 AI PDF Notes Taker (PDFSense)

An intelligent web app that lets you upload PDFs, read and understand their content using Gemini AI, and generate notes or ask questions. Perfect for students, researchers, and professionals who want to quickly understand long documents.

## 🌐 Live Demo

👉 [Visit the Website](https://ai-notes-pdf-taker-3vzc.vercel.app/)


## 🚀 Features

- 📤 Upload and preview PDF files
- 🧠 AI-powered answers to your questions (Gemini API)
- ✍️ Smart note-taking using Tiptap editor
- 🧾 View all your uploaded PDFs in a sidebar
- 🔐 User authentication with Auth.js

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React**
- **Tailwind CSS**
- **Tiptap** (Rich text editor)
- **Shadcn/ui** (UI components)
- **Socket.IO** (optional for real-time collab)

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **Multer** for file uploads
- **Gemini API (Google AI)** for question answering
- **Embeddings & Chunking** for PDF content
- **Auth.js** for authentication

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ai-pdf-notes-taker.git
cd ai-pdf-notes-taker
```
### 2. Set up environmental variable

```bash
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```
### 3. Install dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```
### 4. Run the app

```bash
# Frontend (Next.js)
npm run dev

# Backend (Express)
cd backend
npx nodemon
```

###  How it works

- Upload a PDF through the UI.
- The backend stores the file and chunks the text content.
- Embeddings are created and saved in MongoDB.
- You can ask questions about the PDF, and Gemini will respond based on the relevant chunks.
- Use the Tiptap editor to create and save smart notes.

###  📄 License
- MIT
