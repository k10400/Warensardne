// ... previous JavaScript code ...

// Example for sound1 (repeat for other sounds)
const sound1 = document.getElementById('sound1');
const playButton1 = document.getElementById('playButton1');
const pauseButton1 = document.getElementById('pauseButton1');
const stopButton1 = document.getElementById('stopButton1');
const controls1 = document.getElementById('controls1');

playButton1.addEventListener('click', () => {
    sound1.play();
    controls1.style.display = 'block'; 
});

pauseButton1.addEventListener('click', () => {
    sound1.pause();
});

stopButton1.addEventListener('click', () => {
    sound1.pause();
    sound1.currentTime = 0; 
    controls1.style.display = 'none'; 
});

// ... rest of the JavaScript code ...


// Handle click events for archive images
archiveImages.forEach(image => {
    image.addEventListener('click', () => {
        const pdfSrc = image.getAttribute('data-pdf');
        const imageOverlay = image.parentNode; // Get the parent .image-overlay element

        if (pdfSrc) {
            pdfCanvas.src = pdfSrc;
            pdfViewer.classList.remove('hidden'); // Show the PDF viewer

            // Add the border class to the image overlay
            imageOverlay.classList.add('bordered');
        } else {
            console.error('No PDF source found for this image.');
        }
    });
});

const images = document.querySelectorAll('.archive-image');
const avsluttButton = document.getElementById('avslutt');

images.forEach((image) => {
  image.addEventListener('click', () => {
    // remove active class from all images
    images.forEach((img) => img.classList.remove('active'));
    // add active class to the clicked image
    image.classList.add('active');
  });
});

avsluttButton.addEventListener('click', () => {
  // remove active class from all images
  images.forEach((img) => img.classList.remove('active'));
});



// Adjust pdfCanvas iframe's width and height based on screen size
function adjustPDFCanvas() {
    const pdfCanvas = document.getElementById('pdfCanvas');
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    if (width <= 768) {
      pdfCanvas.style.width = '100%'; // Take full width on mobile devices
      pdfCanvas.style.height = '80vh'; // Adjust height to fit mobile screen
    } else {
      pdfCanvas.style.width = '80%'; // Take 80% width on larger screens
      pdfCanvas.style.height = '1000px'; // Fixed height on larger screens
    }
  }
  
  // Call adjustPDFCanvas on load and resize
  window.onload = adjustPDFCanvas;
  window.onresize = adjustPDFCanvas;


  
  
  import { PDFDocument } from 'pdfjs-dist/build/pdf';

// ...

archiveImages.forEach(image => {
  image.addEventListener('click', () => {
    const pdfSrc = image.getAttribute('data-pdf');
    if (pdfSrc) {
      // Use PDF.js to render the PDF file
      const pdfDoc = new pdfjsLib.PDFDocument();
      pdfDoc.load(pdfSrc).then(pdf => {
        const pdfPage = pdf.getPage(1);
        const scale = 1.5;
        const viewport = pdfPage.getViewport({ scale: scale });
        const canvas = document.getElementById('pdfCanvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        pdfPage.render({ canvasContext: context, viewport: viewport });
      });
      pdfViewer.classList.remove('hidden'); // Show the PDF viewer
    } else {
      console.error('No PDF source found for this image.');
    }
  });
});