$(document).ready(function () {
  const portfolioContainer = $('.portfolio');
  const contentContainer = $('.content');
  const outlineContainer = $('.outline');
  const loadingElement = $('#loading');

  if (!window.driveConfig || !driveConfig.apiKey || !driveConfig.folderId) {
    loadingElement.text('Error: Configuration not loaded properly.');
    return;
  }

  // Fetch folder contents from Google Drive
  function fetchDriveFolder(folderId) {
    return $.ajax({
      url: `https://www.googleapis.com/drive/v3/files`,
      data: {
        q: `'${folderId}' in parents`,
        key: driveConfig.apiKey,
        fields: 'files(id,name,mimeType,webViewLink,webContentLink,fileExtension)'
      }
    }).then(res => res.files).catch(err => {
      console.error('Error fetching folder:', err);
      loadingElement.text('Error loading content.');
      return [];
    });
  }

  // Fetch Markdown file content
  function fetchFileContent(fileId, fileName) {
    return $.ajax({
      url: `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${driveConfig.apiKey}`
    }).then(res => res).catch(() => {
      // Try Google Doc export fallback
      return $.ajax({
        url: `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain&key=${driveConfig.apiKey}`
      }).then(res => res).catch(() => {
        return `# Error Loading "${fileName}"\n\nPlease check file permissions or format.`;
      });
    });
  }

  // Display Markdown content and generate outline
  function displayContent(fileId, fileName = '') {
    loadingElement.show();
    contentContainer.empty();
    outlineContainer.find('ul').remove();

    fetchFileContent(fileId, fileName).then(content => {
      const html = marked.parse(content);
      contentContainer.html(html);
      generateOutline();

      history.pushState({ fileId, fileName, view: 'content' }, fileName, `?file=${fileId}`);
      loadingElement.hide();
    });
  }

  // Generate outline based on headings in `.content`
  function generateOutline() {
    const outlineList = $('<ul></ul>');
    contentContainer.find('h1, h2, h3, h4, h5, h6').each(function (i, el) {
      const $el = $(el);
      const text = $el.text();
      const id = `heading-${i}`;
      $el.attr('id', id);

      const link = $('<a></a>').attr('href', `#${id}`).text(text);
      const li = $('<li></li>').append(link);
      outlineList.append(li);
    });
    outlineContainer.append(outlineList);
  }

  // Show files in a selected folder
  function showFilesInFolder(folderId, folderName) {
    loadingElement.show();
    contentContainer.empty();

    fetchDriveFolder(folderId).then(files => {
      const markdownFiles = files.filter(f =>
        f.name.endsWith('.md') || (f.fileExtension || '').toLowerCase() === 'md'
      );

      if (markdownFiles.length === 0) {
        contentContainer.html(`<p>No markdown files found in "${folderName}"</p>`);
        loadingElement.hide();
        return;
      }

      const list = $('<ul class="file-list"></ul>');
      markdownFiles.forEach(file => {
        const btn = $('<button></button>').text(file.name.replace('.md', ''));
        btn.on('click', () => displayContent(file.id, file.name));
        list.append($('<li></li>').append(btn));
      });

      contentContainer.append(`<h3>Select a file from "${folderName}":</h3>`);
      contentContainer.append(list);

      history.pushState({ folderId, folderName, view: 'files' }, folderName, `?folder=${folderId}`);
      loadingElement.hide();
    });
  }

  // Load and display root folders in "Portfolio"
  function showPortfolio() {
    loadingElement.show();
    fetchDriveFolder(driveConfig.folderId).then(files => {
      const folders = files.filter(f => f.mimeType === 'application/vnd.google-apps.folder');
      const markdownFiles = files.filter(f =>
        f.name.endsWith('.md') || (f.fileExtension || '').toLowerCase() === 'md'
      );

      const portfolioList = $('<ul></ul>');

      folders.forEach(folder => {
        const btn = $('<button></button>').text(folder.name);
        btn.on('click', () => showFilesInFolder(folder.id, folder.name));
        portfolioList.append($('<li></li>').append(btn));
      });

      // Optional: Show markdown files in root
      if (markdownFiles.length > 0) {
        markdownFiles.forEach(file => {
          const btn = $('<button></button>').text(file.name.replace('.md', ''));
          btn.on('click', () => displayContent(file.id, file.name));
          portfolioList.append($('<li></li>').append(btn));
        });
      }

      portfolioContainer.append(portfolioList);
      loadingElement.hide();
    });
  }

  // Back/forward navigation
  $(window).on('popstate', function (event) {
    const state = event.originalEvent.state;
    if (state) {
      if (state.view === 'folders') showPortfolio();
      else if (state.view === 'files') showFilesInFolder(state.folderId, state.folderName);
      else if (state.view === 'content') displayContent(state.fileId, state.fileName);
    } else {
      showPortfolio();
    }
  });

  // Initial state based on URL
  function checkInitialState() {
    const urlParams = new URLSearchParams(window.location.search);
    const fileParam = urlParams.get('file');
    const folderParam = urlParams.get('folder');

    if (fileParam) {
      displayContent(fileParam);
    } else if (folderParam) {
      showPortfolio().then(() => {
        showFilesInFolder(folderParam, 'Folder');
      });
    } else {
      showPortfolio();
    }
  }

  checkInitialState();
});