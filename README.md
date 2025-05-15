# PDFSync

PDFSync is a modern web application that allows users to upload, preview, and interact with PDF documents seamlessly. It includes AI-powered features for querying PDF content, notes management, and personalized dashboards.

---

## Features

- Upload and preview PDF files directly in the browser
- AI-powered querying of PDF content for quick insights
- User authentication and personalized dashboard
- Secure session management with persistent login
- Responsive and intuitive UI built with Next.js and Tailwind CSS
- Backend API with Express and MongoDB for data storage

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Auth.js (NextAuth.js)
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** Auth.js with JWT/session support
- **AI Integration:** Gemini API for PDF content querying

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- MongoDB (local or Atlas)
- Gemini API key (optional for AI features)

### Installation

1. Clone the repo

```bash
git clone https://github.com/yourusername/pdfsync.git
```

Backend .env

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your Gemini API key

```

