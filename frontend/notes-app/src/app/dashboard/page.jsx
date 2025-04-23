'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, Loader2 } from 'lucide-react';
import GetPdfList from '../sidebar/page';
import { toast } from 'sonner';

export default function UploadPDF() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUpload = async () => {
    if (!file) {
      toast.warning('Please select a PDF to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:5000/pdf/uploadpdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`✅ Uploaded: ${data.pdf.filename}`);
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
    <div>
      <div className='text-3xl font-bold py-4 px-4'>Workspace</div>
      <div className='sm:flex h-[90vh] sm:px-4'>
        <div className='uploadyourPdf w-full sm:w-[25%] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
          <div className="w-full px-4 sm:px-6 md:px-8 max-w-lg mx-auto mt-10">
            <div className="bg-white rounded-xl p-6 sm:p-8 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-semibold text-center">
                Upload PDF
              </h2>

              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-sm"
              />

              <Button
                onClick={handleUpload}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" /> Upload PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className='uploadedPdf w-full sm:w-[70%]'>
          <GetPdfList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}
