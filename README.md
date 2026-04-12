# 📄 PDFsense — AI-Powered PDF Chat & Notes

> Upload any PDF. Ask questions. Get instant AI answers. Take smart notes.

**PDFsense** is a full-stack web application that lets users have a real conversation with their PDF documents using Google Gemini AI. Built for students, researchers, and professionals who need to extract insights from long documents fast.

🌐 **[Live Demo](https://ai-notes-pdf-taker.vercel.app/)** · 

---

## 🎬 Screenshots

Landing page
<img width="1344" height="606" alt="image" src="https://github.com/user-attachments/assets/97d75738-6431-4950-a796-4ff7c9ff0e6b" />

<img width="392" height="383" alt="image" src="https://github.com/user-attachments/assets/97d0890a-4fa2-485a-bd5d-fe370a7779a3" />





---

## ✨ Features

-  **PDF Upload & Preview** — upload PDFs and view them directly in the browser
-  **AI Q&A with Gemini** — ask any question about your PDF and get context-aware answers
-  **Smart Note Taking** — rich text editor powered by Tiptap for capturing insights
-  **PDF Library** — sidebar showing all your uploaded documents, organized by date
-  **Authentication** — secure sign up / login with Auth.js (NextAuth)
-  **Guest Demo Mode** — try the core feature without creating an account (1 upload, 5 questions)

---

## 🛠️ How It Works

1. User uploads a PDF through the UI
2. Backend reads and **chunks** the PDF text into 500-character segments using `pdf-parse`
3. Chunks are stored in **MongoDB** linked to the user's account
4. When a question is asked, relevant chunks are retrieved and sent as **context to Gemini API**
5. Gemini returns a grounded, accurate answer based only on the PDF content
6. User can save insights using the **Tiptap rich text editor**

This approach (context stuffing with chunking) ensures Gemini answers are grounded in the actual document rather than hallucinating.

---

## 🧰 Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework, routing, SSR |
| React | UI components |
| Tailwind CSS | Styling |
| Tiptap | Rich text note editor |
| Shadcn/ui | UI component library |
| Auth.js (NextAuth) | Session management on client |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database for users, PDFs, chunks |
| Multer | PDF file upload handling |
| pdf-parse | Extract and chunk PDF text |
| Google Gemini API | AI question answering |
| Auth.js | Authentication & JWT sessions |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Google Gemini API key → [Get one here](https://makersuite.google.com/app/apikey)

### 1. Clone the repo
```bash
git clone https://github.com/TheAihtesham/AI-notes-pdf-taker.git
cd AI-notes-pdf-taker
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

```bash
npx nodemon
```

### 3. Frontend setup
```bash
cd frontend/notes-app
npm install
```

Create `frontend/notes-app/.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📁 Project Structure

```
AI-notes-pdf-taker/
├── backend/
│   ├── controller/      # Route handler functions (upload, ask, auth)
│   ├── middleware/       # Auth middleware (protect routes)
│   ├── model/           # Mongoose schemas (User, PDF)
│   ├── routes/          # Express route definitions
│   ├── uploads/         # Stored PDF files
│   ├── .env             # Environment variables
│   └── index.js         # Express app entry point
└── frontend/notes-app/
    └── src/
        ├── app/
        │   ├── _components/  # Shared UI components
        │   ├── api/          # Next.js API routes (Auth.js)
        │   ├── dashboard/    # Main app after login
        │   ├── demo/         # Guest demo (no login required)
        │   ├── login/        # Login page
        │   ├── register/     # Register page
        │   ├── pdf/          # PDF viewer page
        │   ├── pdfviewer/    # PDF rendering component
        │   ├── sidebar/      # PDF library sidebar
        │   ├── layout.js     # Root layout
        │   └── page.jsx      # Landing page
        ├── components/       # Shadcn/ui components
        └── lib/              # Utility functions
```

---

## 🔑 Key Technical Decisions

**Why chunking instead of full-text?**
Gemini has a context window limit. Sending the entire PDF text at once would fail for large documents. Chunking into 500-character segments keeps requests within limits while preserving enough context for accurate answers.

**Why Auth.js over Clerk?**
Full control over user data in MongoDB. No third-party dependency for something as critical as authentication. Easier to extend with custom fields.

**Why a guest demo?**
Lowering the barrier to try the product — no sign-up friction means more people actually experience the core value before committing to an account.

---

## 📄 License

MIT — feel free to use this project as inspiration or a learning reference.

---

## 👤 Author

**Aihtesham** — [@TheAihtesham](https://github.com/TheAihtesham)

*Open to opportunities — feel free to reach out!*
