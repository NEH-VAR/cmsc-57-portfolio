document.addEventListener('DOMContentLoaded', function() {
    // Current folder ID stack for navigation
    let folderStack = [{ id: 'root', name: 'Home' }];
    
    // DOM elements
    const folderContentsEl = document.getElementById('folder-contents');
    const breadcrumbEl = document.getElementById('breadcrumb');
    const markdownContentEl = document.getElementById('markdown-content');
    const contentTitleEl = document.getElementById('content-title');
    
    // Initialize the app
    loadFolderContents('root');
    
    // Function to load folder contents
    async function loadFolderContents(folderId) {
        try {
            folderContentsEl.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';
            
            const response = await fetch(`/api/folders/${folderId}`);
            const items = await response.json();
            
            folderContentsEl.innerHTML = '';
            
            if (items.length === 0) {
                folderContentsEl.innerHTML = '<p>No items found in this folder.</p>';
                return;
            }
            
            // Separate folders and files
            const folders = items.filter(item => item.mimeType === 'application/vnd.google-apps.folder');
            const files = items.filter(item => item.mimeType !== 'application/vnd.google-apps.folder');
            
            // Display folders first
            folders.forEach(folder => {
                const folderEl = document.createElement('div');
                folderEl.className = 'folder-item d-flex align-items-center';
                folderEl.innerHTML = `<i class="fas fa-folder"></i> ${folder.name}`;
                folderEl.addEventListener('click', () => {
                    folderStack.push({ id: folder.id, name: folder.name });
                    updateBreadcrumb();
                    loadFolderContents(folder.id);
                });
                folderContentsEl.appendChild(folderEl);
            });
            
            // Then display files
            files.forEach(file => {
                const fileEl = document.createElement('div');
                fileEl.className = 'file-item d-flex align-items-center';
                
                // Check if it's a markdown file
                if (file.name.endsWith('.md')) {
                    fileEl.innerHTML = `<i class="fas fa-file-alt"></i> ${file.name.replace('.md', '')}`;
                    fileEl.addEventListener('click', () => {
                        loadMarkdownFile(file.id, file.name.replace('.md', '));
                    });
                } else {
                    fileEl.innerHTML = `<i class="fas fa-file"></i> ${file.name}`;
                    fileEl.addEventListener('click', () => {
                        window.open(file.webViewLink, '_blank');
                    });
                }
                
                folderContentsEl.appendChild(fileEl);
            });
        } catch (error) {
            console.error('Error loading folder contents:', error);
            folderContentsEl.innerHTML = '<p class="text-danger">Error loading folder contents. Please try again.</p>';
        }
    }
    
    // Function to load markdown file content
    async function loadMarkdownFile(fileId, fileName) {
        try {
            markdownContentEl.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';
            contentTitleEl.textContent = fileName;
            
            const response = await fetch(`/api/file/${fileId}`);
            const content = await response.text();
            
            markdownContentEl.innerHTML = content;
        } catch (error) {
            console.error('Error loading markdown file:', error);
            markdownContentEl.innerHTML = '<p class="text-danger">Error loading file content. Please try again.</p>';
        }
    }
    
    // Function to update breadcrumb navigation
    function updateBreadcrumb() {
        breadcrumbEl.innerHTML = '';
        
        folderStack.forEach((folder, index) => {
            const li = document.createElement('li');
            li.className = 'breadcrumb-item';
            
            if (index === folderStack.length - 1) {
                li.className += ' active';
                li.setAttribute('aria-current', 'page');
                li.textContent = folder.name;
            } else {
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = folder.name;
                a.addEventListener('click', () => {
                    // Navigate back to this folder
                    folderStack = folderStack.slice(0, index + 1);
                    updateBreadcrumb();
                    loadFolderContents(folder.id);
                });
                li.appendChild(a);
            }
            
            breadcrumbEl.appendChild(li);
        });
    }
    
    // Event delegation for breadcrumb home link
    breadcrumbEl.addEventListener('click', function(e) {
        if (e.target.matches('[data-folder="root"]')) {
            e.preventDefault();
            folderStack = [{ id: 'root', name: 'Home' }];
            updateBreadcrumb();
            loadFolderContents('root');
        }
    });
});