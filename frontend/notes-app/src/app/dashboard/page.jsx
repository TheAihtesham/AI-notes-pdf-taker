'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud, Loader2, LogOut, FileText, Search, Plus, FolderOpen } from 'lucide-react';
import GetPdfList from '../sidebar/page';
import { toast } from 'sonner';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';

export default function Workspace() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-slate-400 font-medium tracking-tight">Syncing Workspace...</p>
      </div>
    );
  }

  const handleUpload = async () => {
    if (!file) {
      toast.warning('Please select a PDF to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      setIsLoading(true);
      const res = await fetch('https://ai-notes-pdf-taker.onrender.com/pdf/uploadpdf', {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        },
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Uploaded: ${data.pdf.filename}`);
        setFile(null);
        setRefreshTrigger((prev) => prev + 1);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      toast.error(`${error.message || 'Something went wrong'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden font-sans">
      
      {/* 1. TOP NAVBAR */}
      <header className="h-16 border-b border-slate-100 flex items-center justify-between px-4 md:px-6 shrink-0 z-50 bg-white">
        <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                PDF<span className="text-blue-600">Sense</span>
            </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 px-2 md:px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 shrink-0">
                {session?.user?.name?.[0] || 'U'}
            </div>
            <p className="hidden xs:block text-xs font-semibold text-slate-600 truncate max-w-[80px] md:max-w-none">
                {session?.user?.name || 'User'}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
          >
            <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT (Responsive Flex) */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT COLUMN: UPLOAD (Full width on mobile, 30-40% on desktop) */}
        <section className="w-full md:w-[35%] lg:w-[30%] border-b md:border-b-0 md:border-r border-slate-100 p-6 md:p-8 flex flex-col gap-6 bg-slate-50/30 overflow-y-auto shrink-0">
            <div className="space-y-1">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">Add Document</h2>
                <p className="text-sm text-slate-500">Upload a PDF to start analyzing.</p>
            </div>

            <div className="flex flex-col gap-4">
                <div className="relative group border-2 border-dashed border-slate-200 bg-white rounded-2xl p-6 md:p-10 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300">
                    <input 
                        type="file" 
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700 truncate px-2">
                        {file ? file.name : "Select or drag PDF"}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 italic">Max 10MB</p>
                </div>

                <Button
                    onClick={handleUpload}
                    disabled={isLoading || !file}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl shadow-lg shadow-blue-200 transition-all font-bold"
                >
                    {isLoading ? (
                        <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...</>
                    ) : (
                        <><Plus className="w-4 h-4 mr-2" /> Create Notes</>
                    )}
                </Button>
            </div>
        </section>

        {/* RIGHT COLUMN: DOCUMENT LIST (Full width on mobile, 60-70% on desktop) */}
        <section className="flex-1 flex flex-col min-h-0 bg-white">
            {/* List Header */}
            <div className="p-4 md:p-6 border-b border-slate-50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-slate-400" />
                    <h3 className="text-md md:text-lg font-bold text-slate-900">Your Library</h3>
                </div>
                
            </div>

            {/* List Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                <GetPdfList refreshTrigger={refreshTrigger} />
            </div >
        </section>

      </main>
    </div>
  );
}