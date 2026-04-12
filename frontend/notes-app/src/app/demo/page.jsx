'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DemoPage() {
  const router = useRouter();
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('pdfsense_demo_used') === 'true') {
      router.replace('/demo/expired');
    }
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10MB.');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/demo/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Upload failed');

      // Mark demo as used in localStorage
      localStorage.setItem('pdfsense_demo_used', 'true');
      localStorage.setItem('pdfsense_demo_docId', data.docId);
      localStorage.setItem('pdfsense_demo_filename', file.name);

      router.push('/demo/chat');
    } catch (err) {
      setError(err.message);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md shadow-sm">
        <div className="text-center mb-6">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-3">
            Guest Demo · 1 free upload
          </span>
          <h1 className="text-2xl font-semibold text-gray-900">Try PDFsense</h1>
          <p className="text-gray-500 text-sm mt-1">
            Upload any PDF and start asking questions instantly. No sign-up needed.
          </p>
        </div>

        <div
          onClick={() => !uploading && fileRef.current.click()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center gap-3 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
        >
          <span className="text-4xl">📄</span>
          <p className="text-sm font-medium text-gray-700">Click to choose a PDF</p>
          <p className="text-xs text-gray-400">Max 10MB</p>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleUpload}
        />

        {uploading && (
          <p className="text-center text-sm text-blue-600 mt-4 animate-pulse">
            Uploading and processing your PDF...
          </p>
        )}

        {error && (
          <p className="text-center text-sm text-red-500 mt-4">{error}</p>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          Want unlimited uploads?{' '}
          <a href="/register" className="text-blue-500 hover:underline font-medium">
            Create a free account →
          </a>
        </p>
      </div>
    </div>
  );
}