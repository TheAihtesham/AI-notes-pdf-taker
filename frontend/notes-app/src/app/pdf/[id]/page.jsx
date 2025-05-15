'use client';

import PdfViewer from '../../pdfviewer/page';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Tiptap from '@/app/_components/texteditor';
import { useSession } from 'next-auth/react';

const Workspace = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!id || !session?.accessToken) return;

    const fetchPDF = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/pdf/${id}`, {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`,
          },
        });
        console.log('Response status:', res.status);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setPdfData(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPDF();
  }, [id, session?.accessToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading PDF...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="border-b shadow-sm">
      </div>
      <div className="sm:flex flex-1 sm:overflow-hidden">
        <div className="sm:w-1/2 p-4 overflow-y-auto border-r border-gray-200 bg-white hide-scrollbar">
          <div className='flex justify-between items-center'>
            <h2 className="text-xl font-semibold mb-4">Notes / Editor</h2>
            <h3 className='text-[12px] font-semibold mb-4'>{pdfData?.filename}</h3>
          </div>
          <div className="text-gray-600">
            <Tiptap pdfId={id} userId={session?.user?.id} />
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 hidden sm:block p-4 overflow-y-auto bg-gray-100 hide-scrollbar">
          {pdfData && (
            <>
              <h2 className="text-xl font-semibold mb-4">PDF Preview</h2>
              <PdfViewer fileUrl={pdfData.fileUrl} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
