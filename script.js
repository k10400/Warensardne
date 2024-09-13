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


  
  
  const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'path/to/pdf.worker.js';

let pdfDoc = null;
const pdfCanvas = document.getElementById('pdfCanvas');
const ctx = pdfCanvas.getContext('2d');

function renderPage(pageNum) {
    pdfDoc.getPage(pageNum).then(page => {
        const scale = window.innerWidth <= 768 ? 0.8 : 1.5;
        const viewport = page.getViewport({ scale: scale });

        pdfCanvas.height = viewport.height;
        pdfCanvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        page.render(renderContext);

        document.getElementById('currentPage').textContent = pageNum;
    });
}

function loadAndRenderPDF(pdfSrc) {
    pdfjsLib.getDocument(pdfSrc).promise.then(pdf => {
        pdfDoc = pdf;
        const totalPages = pdf.numPages;
        document.getElementById('totalPages').textContent = totalPages;
        renderPage(1); // Render the first page initially
        document.getElementById('pdfViewer').classList.remove('hidden'); // Show the PDF viewer
    }).catch(error => {
        console.error('Error loading PDF:', error);
    });
}

document.querySelectorAll('.archive-image').forEach(image => {
    image.addEventListener('click', () => {
        const pdfSrc = image.getAttribute('data-pdf');
        if (pdfSrc) {
            loadAndRenderPDF(pdfSrc);
            image.parentNode.classList.add('bordered'); // Add border to image overlay
        } else {
            console.error('No PDF source found for this image.');
        }
    });
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (pdfDoc) {
        const currentPage = parseInt(document.getElementById('currentPage').textContent, 10);
        if (currentPage < pdfDoc.numPages) {
            renderPage(currentPage + 1);
        }
    }
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (pdfDoc) {
        const currentPage = parseInt(document.getElementById('currentPage').textContent, 10);
        if (currentPage > 1) {
            renderPage(currentPage - 1);
        }
    }
});

function adjustPDFCanvas() {
    const width = window.innerWidth;
    pdfCanvas.style.width = width <= 768 ? '100%' : '80%';
    pdfCanvas.style.height = width <= 768 ? '80vh' : '1000px';
}

window.onload = adjustPDFCanvas;
window.onresize = adjustPDFCanvas;


// Select all audio elements and play buttons
const audioElements = document.querySelectorAll('audio');
const playButtons = document.querySelectorAll('.les-opp-button');

// Function to stop all audios except the currently clicked one
function pauseAllAudios(except) {
    audioElements.forEach((audio) => {
        if (audio !== except) {
            audio.pause();
            audio.currentTime = 0; // Reset time to the beginning
        }
    });
}

// Loop through each play button to add event listeners
playButtons.forEach((button, index) => {
    const sound = document.getElementById(`lesOppAudio${index + 1}`);
    const pauseButton = document.getElementById(`pauseButton${index + 1}`);
    const stopButton = document.getElementById(`stopButton${index + 1}`);
    const controls = document.getElementById(`controls${index + 1}`);

    button.addEventListener('click', () => {
        // Pause all other audio elements before playing the selected one
        pauseAllAudios(sound);

        // Play the current audio
        sound.play();
        controls.style.display = 'block'; // Show pause/stop controls when playing
    });

    // Add functionality to the pause button
    pauseButton.addEventListener('click', () => {
        sound.pause();
    });

    // Add functionality to the stop button
    stopButton.addEventListener('click', () => {
        sound.pause();
        sound.currentTime = 0; // Reset to the start
        controls.style.display = 'none'; // Hide controls when stopped
    });
});
