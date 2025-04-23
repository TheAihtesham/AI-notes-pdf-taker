'use client';

import WorkspaceComponents from '../../workspaceheader/page';
import PdfViewer from '../../pdfviewer/page';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Tiptap from '@/app/_components/texteditor';

const Workspace = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/pdf/${id}`);
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

    if (id) {
      fetchPDF();
    }
  }, [id]);

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
      {/* Header */}
      <div className="border-b shadow-sm">
       
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Notes or Sidebar Area */}
        <div className="w-1/2 p-2 overflow-y-auto border-r border-gray-200 bg-white hide-scrollbar">
          <h2 className="text-xl font-semibold mb-4">Notes / Editor</h2>
          <div className="text-gray-600">
            <Tiptap />
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100 hide-scrollbar">
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
