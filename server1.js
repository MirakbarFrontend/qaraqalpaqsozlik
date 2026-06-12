// Minimal Express server to verify Telegram widget data and mint Firebase custom tokens.
// Usage:
//  - Set environment variables (see .env.example)
//  - npm install
//  - node server.js
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.ORIGIN || '*' // set to your frontend origin in production
}));

const BOT_TOKEN = process.env.BOT_TOKEN;
if(!BOT_TOKEN){
  console.error('BOT_TOKEN not set in environment. Set it in .env');
  process.exit(1);
}

// Initialize Firebase Admin
// Preferred: set GOOGLE_APPLICATION_CREDENTIALS env var to path of service account JSON
if(process.env.GOOGLE_APPLICATION_CREDENTIALS){
  admin.initializeApp();
} else if(process.env.SERVICE_ACCOUNT_JSON){
  // If you prefer to pass JSON string as env var (not recommended for production)
  const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  console.error('Firebase service account not configured. Set GOOGLE_APPLICATION_CREDENTIALS or SERVICE_ACCOUNT_JSON.');
  process.exit(1);
}

function verifyTelegramAuthData(data, botToken) {
  // Telegram docs: https://core.telegram.org/widgets/login#checking-authorization
  const hash = data.hash;
  if(!hash) return false;

  // create data_check_string
  const checkArr = Object.keys(data)
    .filter(k => k !== 'hash')
    .sort()
    .map(k => `${k}=${data[k]}`);

  const data_check_string = checkArr.join('\n');

  // secret key is sha256(botToken)
  const secret_key = crypto.createHash('sha256').update(botToken).digest();

  // compute HMAC-SHA256 of data_check_string using secret_key
  const hmac = crypto.createHmac('sha256', secret_key).update(data_check_string).digest('hex');

  // timing-safe compare
  try{
    return crypto.timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(hash, 'hex'));
  }catch(e){
    return false;
  }
}

app.post('/telegram-auth', async (req, res) => {
  const data = req.body;
  if(!data || !data.id || !data.hash){
    return res.status(400).json({ error: 'Invalid payload' });
  }

  try{
    const ok = verifyTelegramAuthData(data, BOT_TOKEN);
    if(!ok) return res.status(400).json({ error: 'Telegram auth verification failed' });

    // check auth_date freshness (optional)
    const authDate = Number(data.auth_date) || 0;
    const now = Math.floor(Date.now()/1000);
    if(now - authDate > 24*3600){
      return res.status(400).json({ error: 'Auth data too old' });
    }

    // Build a Firebase uid for Telegram user
    const uid = `telegram:${data.id}`;

    // Create or update user in Firebase Auth
    try{
      await admin.auth().updateUser(uid, {
        displayName: [data.first_name, data.last_name].filter(Boolean).join(' ') || undefined,
        photoURL: data.photo_url || undefined
      });
    }catch(err){
      if(err.code === 'auth/user-not-found'){
        await admin.auth().createUser({
          uid,
          displayName: [data.first_name, data.last_name].filter(Boolean).join(' ') || undefined,
          photoURL: data.photo_url || undefined
        });
      }else{
        console.warn('Could not create/update user:', err.message || err);
      }
    }

    // Issue a custom token
    const customToken = await admin.auth().createCustomToken(uid, { telegram: { id: data.id, username: data.username }});

    return res.json({ customToken });

  }catch(err){
    console.error('telegram-auth error', err);
    return res.status(500).json({ error: err.message || String(err) });
  }
});

// Optional /telegram-code endpoint (depends on your bot workflow)
app.post('/telegram-code', async (req, res) => {
  const { code } = req.body;
  if(!code) return res.status(400).json({ error: 'No code provided' });

  // IMPLEMENT: verify code against your bot's storage/logic
  // For demo:
  return res.json({ ok: true, message: 'Not implemented - implement bot-server exchange here' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
