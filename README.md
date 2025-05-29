# CMS-57 Portfolio

A simple portfolio that pulls content from Google Drive, organizing folders as sections and Markdown files as content.

## Setup Instructions

1. Clone this repository
2. Create a `config.js` file based on the template provided
3. Obtain a Google API key with Drive access
4. Set up a Google Drive folder with your content:
   - Create folders for each section
   - Place Markdown (.md) files in these folders
5. Open `index.html` in a browser

## Configuration

Edit the `config.js` file with your:
- Google Drive API key
- Folder ID of your portfolio content

## Features

- Dynamic loading of content from Google Drive
- Markdown support for easy content creation
- Responsive design
- Simple navigation between sections

## Dependencies

- [marked.js](https://marked.js.org/) for Markdown parsing
- Google Drive API