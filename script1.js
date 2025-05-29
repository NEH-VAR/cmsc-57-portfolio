const API_BASE_URL = "https://www.googleapis.com/drive/v3/files";
const THUMBNAIL_BASE_URL = "https://drive.google.com/thumbnail";
const DEFAULT_IMAGE = "https://placehold.co/191x208?text=Image+Not+Found";

// Fetch folders from Google Drive
function fetchDriveFolders(apiKey, folderId) {
    const url = `${API_BASE_URL}?q='${folderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${apiKey}`;
    
    return $.get(url).then(data => data.files || []);
}

// Fetch thumbnail image for a folder
function fetchThumbnail(apiKey, folderId) {
    const url = `${API_BASE_URL}?q='${folderId}'+in+parents+and+name='thumbnail.png'&key=${apiKey}`;
    
    return $.get(url).then(data => {
        if (data.files && data.files.length > 0) {
            const imageId = data.files[0].id;
            return `${THUMBNAIL_BASE_URL}?id=${imageId}&sz=w400`;
        }
        return DEFAULT_IMAGE;
    }).catch(() => DEFAULT_IMAGE);
}

// Fetch description text for a folder
function fetchDescription(apiKey, folderId) {
    const url = `${API_BASE_URL}?q='${folderId}'+in+parents+and+name='description.txt'&key=${apiKey}`;
    
    return $.get(url).then(data => {
        if (data.files && data.files.length > 0) {
            const descId = data.files[0].id;
            const fileUrl = `${API_BASE_URL}/${descId}?alt=media&key=${apiKey}`;
            return $.get(fileUrl).then(content => content).catch(() => "No description available");
        }
        return "No description available";
    }).catch(() => "No description available");
}

// Render a card into the DOM
function createCard(chapter, imageSrc, description) {
    const cardHtml = `
        <div class="card">
            <div class="image-container">
                <img src="${imageSrc}" alt="${chapter}" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE}'"/>
            </div>
            <h1 class="chapter">${chapter}</h1>
            <p>${description}</p>
        </div>
    `;
    $('.card-carousel').append(cardHtml);
}

// Fetch and render all cards
function renderAllCards(apiKey, folderId) {
    fetchDriveFolders(apiKey, folderId).then(folders => {
        const allFetches = folders.map(folder => {
            return Promise.all([
                fetchThumbnail(apiKey, folder.id),
                fetchDescription(apiKey, folder.id)
            ]).then(([imageSrc, description]) => {
                createCard(folder.name, imageSrc, description);
            });
        });

        return Promise.all(allFetches);
    }).catch(error => {
        console.error('Error rendering cards:', error);
        $('.card-carousel').html('<p class="error">Failed to load content from Google Drive.</p>');
    });
}

// Wait for DOM to load
$(document).ready(function () {
    if (driveConfig.apiKey && driveConfig.folderId) {
        renderAllCards(driveConfig.apiKey, driveConfig.folderId);
    } else {
        console.error('Please configure Drive API key and folder ID');
        $('.card-carousel').html('<p class="error">Please configure the Google Drive API settings</p>');
    }

    let autoScrollInterval;
    
    // Initialize carousel after cards are loaded
    function initCarousel() {
        const $carousel = $('.card-carousel');
        const $cards = $('.card');
        let currentIndex = 0;
        
        // Set initial classes
        updateCarousel();
        
        // Start auto-scrolling
        startAutoScroll();
        
        function updateCarousel() {
            $cards.removeClass('active prev next');
            
            // Current active card
            $cards.eq(currentIndex).addClass('active');
            
            // Next card (right side)
            $cards.eq((currentIndex + 1) % $cards.length).addClass('next');
            
            // Previous card (left side)
            $cards.eq((currentIndex - 1 + $cards.length) % $cards.length).addClass('prev');
            
            // Cards beyond the immediate neighbors
            $cards.not('.active, .prev, .next').css({
                'transform': 'scale(0.8)',
                'opacity': '0.5'
            });
        }
        
        function autoScroll() {
            currentIndex = (currentIndex + 1) % $cards.length;
            updateCarousel();
        }
        
        function startAutoScroll() {
            clearInterval(autoScrollInterval); // Clear any existing interval
            autoScrollInterval = setInterval(autoScroll, 3000); // Change every 3 seconds
        }
        
        // Pause on hover
        $carousel.hover(
            function() {
                clearInterval(autoScrollInterval);
            },
            function() {
                startAutoScroll();
            }
        );
    }
});

// Modified renderAllCards to return a Promise
function renderAllCards(apiKey, folderId) {
    return fetchDriveFolders(apiKey, folderId).then(folders => {
        const allFetches = folders.map(folder => {
            return Promise.all([
                fetchThumbnail(apiKey, folder.id),
                fetchDescription(apiKey, folder.id)
            ]).then(([imageSrc, description]) => {
                createCard(folder.name, imageSrc, description);
            });
        });

        return Promise.all(allFetches);
    }).catch(error => {
        console.error('Error rendering cards:', error);
        $('.card-carousel').html('<p class="error">Failed to load content from Google Drive.</p>');
    });
}