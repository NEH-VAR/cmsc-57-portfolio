// Current folder ID (root is initially your main folder ID)
let currentFolderId = 'YOUR_ROOT_FOLDER_ID'; // Replace with your folder ID
let folderStack = []; // To track navigation history

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load the root folder contents
    loadFolderContents(currentFolderId);
    
    // Set up back button
    document.getElementById('back-button').addEventListener('click', () => {
        if (folderStack.length > 0) {
            const prevFolder = folderStack.pop();
            currentFolderId = prevFolder.id;
            updateBreadcrumbs(prevFolder.breadcrumbs);
            loadFolderContents(currentFolderId);
            
            // Show folder contents, hide file viewer
            document.getElementById('folder-contents').style.display = 'block';
            document.getElementById('file-viewer').style.display = 'none';
        }
    });
});

// Load contents of a folder
async function loadFolderContents(folderId) {
    try {
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&key=${GOOGLE_DRIVE_API_KEY}&fields=files(id,name,mimeType)`);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        displayFolderContents(data.files);
    } catch (error) {
        console.error('Error loading folder contents:', error);
        alert('Failed to load folder contents. See console for details.');
    }
}

// Display folder contents
function displayFolderContents(items) {
    const folderContents = document.getElementById('folder-contents');
    folderContents.innerHTML = '';
    
    // Separate folders and files
    const folders = items.filter(item => item.mimeType === 'application/vnd.google-apps.folder');
    const files = items.filter(item => item.mimeType !== 'application/vnd.google-apps.folder');
    
    // Display folders first
    folders.forEach(folder => {
        const folderElement = document.createElement('div');
        folderElement.className = 'folder';
        folderElement.textContent = folder.name;
        folderElement.addEventListener('click', () => {
            // Push current state to stack before navigating
            folderStack.push({
                id: currentFolderId,
                breadcrumbs: getCurrentBreadcrumbs()
            });
            
            currentFolderId = folder.id;
            updateBreadcrumbs();
            loadFolderContents(currentFolderId);
        });
        folderContents.appendChild(folderElement);
    });
    
    // Then display files
    files.forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.className = 'file';
        fileElement.textContent = file.name;
        fileElement.addEventListener('click', () => {
            if (file.name.endsWith('.md')) {
                displayMarkdownFile(file.id);
            } else {
                alert('This viewer only supports Markdown (.md) files.');
            }
        });
        folderContents.appendChild(fileElement);
    });
    
    // Update breadcrumbs
    updateBreadcrumbs();
}

// Display a markdown file
async function displayMarkdownFile(fileId) {
    try {
        // First get the download URL
        const metadataResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?key=${GOOGLE_DRIVE_API_KEY}&fields=webContentLink`);
        const metadata = await metadataResponse.json();
        
        if (!metadata.webContentLink) {
            throw new Error('No download link available');
        }
        
        // Then fetch the actual content
        const contentResponse = await fetch(metadata.webContentLink);
        const markdown = await contentResponse.text();
        
        // Convert markdown to HTML (simple implementation)
        const htmlContent = simpleMarkdownToHtml(markdown);
        
        // Display it
        document.getElementById('markdown-content').innerHTML = htmlContent;
        
        // Show file viewer, hide folder contents
        document.getElementById('folder-contents').style.display = 'none';
        document.getElementById('file-viewer').style.display = 'block';
    } catch (error) {
        console.error('Error loading markdown file:', error);
        alert('Failed to load markdown file. See console for details.');
    }
}

// Simple markdown to HTML converter (for basic formatting)
function simpleMarkdownToHtml(markdown) {
    // Headers
    let html = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>')
                       .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                       .replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
               .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
               .replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Line breaks and paragraphs
    html = html.replace(/\n\n/g, '</p><p>')
               .replace(/\n/g, '<br>');
    
    return '<p>' + html + '</p>';
}

// Update breadcrumbs navigation
function updateBreadcrumbs(breadcrumbs) {
    const breadcrumbsElement = document.getElementById('breadcrumbs');
    
    if (breadcrumbs) {
        breadcrumbsElement.innerHTML = breadcrumbs;
        return;
    }
    
    // This is a simplified version - in a real app, you might want to track the full path
    breadcrumbsElement.innerHTML = `
        <span class="breadcrumb" onclick="navigateToRoot()">Root</span>
        ${folderStack.length > 0 ? '<span class="breadcrumb">Current Folder</span>' : ''}
    `;
}

// Navigate back to root
function navigateToRoot() {
    folderStack = [];
    currentFolderId = '14R4UWozwmNXj5rMkJ-HJTC1hQ38wEnps'; // Replace with your folder ID
    loadFolderContents(currentFolderId);
    updateBreadcrumbs();
    
    // Show folder contents, hide file viewer
    document.getElementById('folder-contents').style.display = 'block';
    document.getElementById('file-viewer').style.display = 'none';
}

// Make navigateToRoot available globally
window.navigateToRoot = navigateToRoot;