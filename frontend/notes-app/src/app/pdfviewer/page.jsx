import React from 'react';

const PdfViewer = ({ fileUrl }) => {
  console.log(fileUrl)
  return (
    <div>
      <iframe src={fileUrl+"#toolbar=0"} height="100vh" width="100%" className='h-[90vh]'/>
    </div>
  );
};

export default PdfViewer;
