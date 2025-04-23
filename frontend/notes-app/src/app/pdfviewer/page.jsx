import React from 'react';
import { Document, Page } from 'react-pdf';

const PdfViewer = ({ fileUrl }) => {
  console.log(fileUrl)
  return (
    <div>
      <iframe src={fileUrl+"#toolbar=0"} height="100vh" width="100%" className='h-[90vh]'/>
    </div>
  );
};

export default PdfViewer;
