$(document).ready(function() {
    // Handle portfolio link clicks
    $('.portfolio-link').on('click', function(e) {
        e.preventDefault();
        const filePath = $(this).data('file');
        loadContent(filePath);
    });
    
    generateOutline();

    const requestedFile = getUrlParam('file');
    if (requestedFile) {
        // Find matching link or default to Counting
        const $link = $(`.portfolio-link:contains("${requestedFile}")`);
        loadContent($link.length ? $link.data('file') : 'files/Counting/Counting.md');
    } else {
        loadContent('files/Counting/Counting.md');
    }

});

// Functions

    // Get URL parameter helper
    function getUrlParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Function to load and display content
    function loadContent(filePath) {
        $.get(filePath)
            .done(function(markdown) {
                // Convert markdown to HTML
                const htmlContent = marked.parse(markdown);
                $('.markdown-container').html(htmlContent);
                
                // Generate new outline
                generateOutline();
            })
            .fail(function(error) {
                console.error('Error loading content:', error);
            });
    }

    // Function to generate outline from headings
    function generateOutline() {
        const $outlineContainer = $('.outline-items').empty();
        
        $('.markdown-container h2, .markdown-container h3').each(function() {
            const $heading = $(this);
            
            // Ensure heading has an ID
            if (!$heading.attr('id')) {
                $heading.attr('id', $heading.text().toLowerCase().replace(/\s+/g, '-'));
            }
            
            // Create outline item
            const $listItem = $('<li>');
            const $link = $('<a>', {
                href: '#' + $heading.attr('id'),
                text: $heading.text()
            });
            
            // Add indentation for h3 elements
            if ($heading.is('h3')) {
                $link.css('padding-left', '20px');
            }
            
            $listItem.append($link);
            $outlineContainer.append($listItem);
        });
    }