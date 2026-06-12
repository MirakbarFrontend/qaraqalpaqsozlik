import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://cdn.tailwindcss.com', 'https://unpkg.com'],
				styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],
				fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
				imgSrc: ["'self'", 'data:', 'blob:'],
				connectSrc: ["'self'", 'http://localhost:3000', 'https://generativelanguage.googleapis.com', 'https://unpkg.com'],
			},
		},
	}),
);

app.use(express.json({ limit: '1mb' }));
app.use(
	cors({
		origin: [
			'https://koshkinbaev.github.io',
			'http://localhost:3000',
			'http://127.0.0.1:3000',
			'http://localhost:5173',
			'http://127.0.0.1:5500',
			'http://localhost:5500',
		],
	}),
);
app.use(rateLimit({ windowMs: 60_000, max: 60 }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const KEY = process.env.GEMINI_API_KEY;

app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/api/gemini', async (req, res) => {
	try {
		if (!KEY) return res.status(500).json({ error: "GEMINI_API_KEY yo'q" });

		const { message } = req.body || {};
		if (!message) return res.status(400).json({ error: "message bo'sh" });

		const prompt = `Sen Qaraqalpaq tilining ekspertisan.
Foydalanuvchi senga bir so'z yozadi.
Sen FAQAT shu so'zning qoraqalpoq tilidagi ma'nosini qisqa va aniq tushuntirasan.
Javob formati:
- Mánisi: (1-2 jumlada qaraqalpoq tilida)
- Mısal: (1 ta misol jumla qaraqalpoq tilida)

Sóz: ${message}`;

		const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${KEY}`;

		const r = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
		});

		const data = await r.json();
		console.log('STATUS:', r.status);

		if (!r.ok) return res.status(500).json({ error: data?.error?.message || 'Gemini error' });

		const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || 'Javob topilmadi.';
		res.json({ text });
	} catch (e) {
		console.error('XATO:', e);
		res.status(500).json({ error: e?.message || 'Server error' });
	}
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
