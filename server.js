require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const marked = require('marked');

const app = express();
const drive = google.drive({ version: 'v3' });

app.use(express.static('public'));

app.get('/api/folders/:folderId?', async (req, res) => {
  try {
    const folderId = req.params.folderId || 'root';
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, webViewLink)',
      auth: process.env.GOOGLE_DRIVE_API_KEY
    });
    res.json(response.data.files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch folders' });
  }
});

app.get('/api/file/:fileId', async (req, res) => {
  try {
    const response = await drive.files.get({
      fileId: req.params.fileId,
      alt: 'media',
      auth: process.env.GOOGLE_DRIVE_API_KEY
    });
    res.send(marked.parse(response.data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch file' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));