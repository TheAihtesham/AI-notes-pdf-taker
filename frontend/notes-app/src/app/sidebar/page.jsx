'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSession } from 'next-auth/react';

const GetPdfList = ({ refreshTrigger }) => {
  const [pdfList, setPdfList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPdfList = async () => {
      try {
        const res = await fetch('http://localhost:5000/pdf',{
          headers: session?.accessToken ?{  
            Authorization: `Bearer ${session?.accessToken}`
          } : {},
        });
        console.log("AccessToken:", session?.accessToken);
        if (!res.ok) throw new Error('Failed to fetch PDF list');
        const data = await res.json();
        setPdfList(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching list:', err);
      } finally {
        setIsLoading(false);
      }
    };

      if(session){
        fetchPdfList();
      }
  }, [session,refreshTrigger]);

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6 bg-white rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">📄 Your PDF Documents</h2>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto scrollbar-hidden">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pdfList.length > 0 ? (
              pdfList.map((pdf) => (
                <li
                  key={pdf._id}
                  className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 flex items-center gap-4 group"
                >
                  <FileText className="w-8 h-8 text-red-500 group-hover:text-red-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/pdf/${pdf._id}`}
                      className="font-medium text-blue-600 group-hover:underline truncate block"
                      title={pdf.filename} 
                    >
                      {pdf.filename || 'Untitled PDF'}
                    </Link>
                    <p className="text-xs text-gray-500">Click to open</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">No PDFs found.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetPdfList;
