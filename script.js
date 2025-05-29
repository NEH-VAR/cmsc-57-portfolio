document.addEventListener('DOMContentLoaded', () => {
  const sectionsNav = document.getElementById('sections-nav');
  const contentDisplay = document.getElementById('content-display');
  const loadingElement = document.getElementById('loading');

  // Check if config is loaded
  if (!driveConfig || !driveConfig.apiKey || !driveConfig.folderId) {
    loadingElement.textContent = 'Error: Configuration not loaded properly.';
    return;
  }

  // State to track current view
  let currentView = 'folders'; // 'folders' or 'files'

  // Fetch folder structure from Google Drive
  async function fetchDriveFolder(folderId) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${driveConfig.apiKey}&fields=files(id,name,mimeType,webViewLink,webContentLink,fileExtension)`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.files;
    } catch (error) {
      console.error('Error fetching folder:', error);
      loadingElement.textContent = 'Error loading content. Please check console for details.';
      return [];
    }
  }

  // Fetch file content from Google Drive
  async function fetchFileContent(fileId, fileName) {
    try {
      // Try direct download first (for uploaded .md files)
      let response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${driveConfig.apiKey}`
      );
      
      if (response.ok) {
        return await response.text();
      }
      
      // If direct download fails, try export (for Google Docs)
      response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain&key=${driveConfig.apiKey}`
      );
      
      if (response.ok) {
        return await response.text();
      }
      
      throw new Error(`Failed to load file content`);
      
    } catch (error) {
      console.error('Error fetching file:', error);
      return `# Error Loading "${fileName}"\n\nPlease ensure:\n1. File is shared publicly\n2. It's a valid Markdown file`;
    }
  }

  // Display content in the main area
  async function displayContent(fileId, fileName = '') {
    loadingElement.style.display = 'block';
    contentDisplay.innerHTML = '';
    
    const content = await fetchFileContent(fileId, fileName);
    contentDisplay.innerHTML = marked.parse(content);
    
    // Update URL without reloading
    history.pushState({ fileId, fileName, view: 'content' }, fileName, `?file=${fileId}`);
    loadingElement.style.display = 'none';
    currentView = 'content';
  }

  // Show files within a folder
  async function showFilesInFolder(folderId, folderName) {
    loadingElement.style.display = 'block';
    contentDisplay.innerHTML = '';
    
    const files = await fetchDriveFolder(folderId);
    const markdownFiles = files.filter(file => 
      file.name.endsWith('.md') || 
      (file.fileExtension && file.fileExtension.toLowerCase() === 'md') ||
      file.mimeType === 'text/markdown'
    );
    
    if (markdownFiles.length === 0) {
      contentDisplay.innerHTML = `<p>No markdown files found in "${folderName}"</p>`;
      loadingElement.style.display = 'none';
      return;
    }
    
    const fileSelector = document.createElement('div');
    fileSelector.className = 'file-selector';
    
    const title = document.createElement('h2');
    title.textContent = `Select a file from "${folderName}":`;
    fileSelector.appendChild(title);
    
    const fileList = document.createElement('ul');
    fileList.className = 'file-list';
    
    markdownFiles.forEach(file => {
      const listItem = document.createElement('li');
      const fileButton = document.createElement('button');
      fileButton.textContent = file.name.replace('.md', '');
      fileButton.addEventListener('click', () => displayContent(file.id, file.name));
      listItem.appendChild(fileButton);
      fileList.appendChild(listItem);
    });
    
    fileSelector.appendChild(fileList);
    contentDisplay.appendChild(fileSelector);
    
    // Update URL state
    history.pushState({ folderId, folderName, view: 'files' }, folderName, `?folder=${folderId}`);
    
    loadingElement.style.display = 'none';
    currentView = 'files';
  }

  // Show the main folders view
  async function showFoldersView() {
    loadingElement.style.display = 'block';
    contentDisplay.innerHTML = '';
    
    const files = await fetchDriveFolder(driveConfig.folderId);
    
    if (files.length === 0) {
      loadingElement.textContent = 'No content found in the specified folder.';
      return;
    }
    
    // Separate folders and markdown files
    const folders = files.filter(file => file.mimeType === 'application/vnd.google-apps.folder');
    const markdownFiles = files.filter(file => 
      file.name.endsWith('.md') || 
      (file.fileExtension && file.fileExtension.toLowerCase() === 'md') ||
      file.mimeType === 'text/markdown'
    );
    
    // Create folders navigation
    if (folders.length > 0) {
      const foldersTitle = document.createElement('h2');
      foldersTitle.textContent = 'Folders:';
      contentDisplay.appendChild(foldersTitle);
      
      const foldersList = document.createElement('ul');
      foldersList.className = 'folders-list';
      
      folders.forEach(folder => {
        const listItem = document.createElement('li');
        const folderButton = document.createElement('button');
        folderButton.textContent = folder.name;
        folderButton.addEventListener('click', () => showFilesInFolder(folder.id, folder.name));
        listItem.appendChild(folderButton);
        foldersList.appendChild(listItem);
      });
      
      contentDisplay.appendChild(foldersList);
    }
    
    // Create direct files navigation (for files in root)
    if (markdownFiles.length > 0) {
      const filesTitle = document.createElement('h2');
      filesTitle.textContent = folders.length > 0 ? 'Files in root:' : 'Files:';
      contentDisplay.appendChild(filesTitle);
      
      const filesList = document.createElement('ul');
      filesList.className = 'files-list';
      
      markdownFiles.forEach(file => {
        const listItem = document.createElement('li');
        const fileButton = document.createElement('button');
        fileButton.textContent = file.name.replace('.md', '');
        fileButton.addEventListener('click', () => displayContent(file.id, file.name));
        listItem.appendChild(fileButton);
        filesList.appendChild(listItem);
      });
      
      contentDisplay.appendChild(filesList);
    }
    
    history.pushState({ view: 'folders' }, '', window.location.pathname);
    loadingElement.style.display = 'none';
    currentView = 'folders';
  }

  // Handle back/forward navigation
  window.addEventListener('popstate', (event) => {
    if (event.state) {
      if (event.state.view === 'folders') {
        showFoldersView();
      } else if (event.state.view === 'files') {
        showFilesInFolder(event.state.folderId, event.state.folderName);
      } else if (event.state.view === 'content') {
        displayContent(event.state.fileId, event.state.fileName);
      }
    } else {
      showFoldersView();
    }
  });

  // Check URL parameters on initial load
  function checkInitialState() {
    const urlParams = new URLSearchParams(window.location.search);
    const fileParam = urlParams.get('file');
    const folderParam = urlParams.get('folder');
    
    if (fileParam) {
      displayContent(fileParam);
    } else if (folderParam) {
      // We need the folder name, so we'll first show folders view then navigate
      showFoldersView().then(() => {
        const folderName = urlParams.get('folderName');
        showFilesInFolder(folderParam, folderName || 'Folder');
      });
    } else {
      showFoldersView();
    }
  }

  // Start the application
  checkInitialState();
});