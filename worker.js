const html = `<!DOCTYPE html>
<!-- Paste your entire index.html content here -->`

export default {
  async fetch() {
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    })
  }
}