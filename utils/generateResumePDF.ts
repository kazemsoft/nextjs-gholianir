import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateResumePDF = async () => {
  // Create a temporary container for the resume
  const resumeContainer = document.createElement('div');
  resumeContainer.style.position = 'absolute';
  resumeContainer.style.left = '-9999px';
  resumeContainer.style.top = '0';
  document.body.appendChild(resumeContainer);

  // Dynamically import React and ReactDOM
  const React = await import('react');
  const ReactDOM = await import('react-dom/client');
  const { default: ResumeTemplate } = await import('../components/ResumeTemplate');

  // Render the resume template
  const root = ReactDOM.createRoot(resumeContainer);

  return new Promise<void>((resolve, reject) => {
    root.render(React.createElement(ResumeTemplate));

    // Wait for rendering to complete
    setTimeout(async () => {
      try {
        const resumeElement = resumeContainer.querySelector('#resume-template') as HTMLElement;

        if (!resumeElement) {
          throw new Error('Resume template not found');
        }

        // Generate canvas from the resume HTML
        const canvas = await html2canvas(resumeElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });

        // Calculate PDF dimensions (A4 size)
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create PDF (A4 Portrait)
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const imgData = canvas.toDataURL('image/png');

        // Add image to PDF
        let position = 0;
        const pageHeight = 297; // A4 height in mm

        if (imgHeight > pageHeight) {
          // Multiple pages
          let heightLeft = imgHeight;

          while (heightLeft > 0) {
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            position -= pageHeight;

            if (heightLeft > 0) {
              pdf.addPage();
            }
          }
        } else {
          // Single page
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        }

        // Download the PDF
        pdf.save('MK-Qoliyan-Resume.pdf');

        // Cleanup
        root.unmount();
        document.body.removeChild(resumeContainer);

        resolve();
      } catch (error) {
        console.error('Error generating PDF:', error);
        root.unmount();
        document.body.removeChild(resumeContainer);
        reject(error);
      }
    }, 500); // Wait for React to render
  });
};
