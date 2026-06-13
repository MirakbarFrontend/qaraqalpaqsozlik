import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai'; // Rasmiy kutubxona

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Gemini API klassini e'lon qilamiz
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

// ==========================================
// TELEGRAM BOTGA XABAR YUBORISH FUNKSIYASI
// ==========================================
async function sendTelegramMessage(text) {
	const token = process.env.TELEGRAM_BOT_TOKEN;
	const chatId = process.env.TELEGRAM_CHAT_ID;

	if (!token || !chatId) {
		console.log('⚠️ Telegram Bot Token yoki Chat ID topilmadi, xabar yuborilmadi.');
		return;
	}

	const url = `https://api.telegram.org/bot${token}/sendMessage`;

	try {
		await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text: text,
				parse_mode: 'HTML',
			}),
		});
		console.log('🚀 Telegram botga bildirishnoma yuborildi!');
	} catch (err) {
		console.error('Telegram botga yuborishda xato:', err);
	}
}
// ==========================================

app.get('/health', (req, res) => res.json({ ok: true }));

// 1. DICTIONARY (GEMINI AI) ENDPOINT
app.post('/api/gemini', async (req, res) => {
	try {
		if (!process.env.GEMINI_API_KEY) {
			return res.status(500).json({ error: 'GEMINI_API_KEY topilmadi' });
		}

		const { message } = req.body || {};
		if (!message) return res.status(400).json({ error: "message bo'sh" });

		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			contents: `Sóz: ${message}`,
			config: {
				systemInstruction: `Sen Qaraqalpaq tilining ekspertisan.
Foydalanuvchi senga bir so'z yozadi.
Sen FAQAT shu so'zning qoraqalpoq tilidagi ma'nosini qisqa va aniq tushuntirasan.
Javob formati:
- Mánisi: (1-2 jumlada qaraqalpoq tilida)
- Mısal: (1 ta misol jumla qaraqalpoq tilida)`,
			},
		});

		res.json({ text: response.text });
	} catch (e) {
		console.error('XATO:', e);
		res.status(500).json({ error: e?.message || 'Server error' });
	}
});

// 2. NEW: RO'YXATDAN O'TGANDA BOTGA XABAR YUBORISH ENDPOINT
app.post('/api/register-notification', async (req, res) => {
	try {
		const { fullName, email, phone } = req.body || {};

		if (!fullName) {
			return res.status(400).json({ error: 'Ism va familiya kiritilishi shart' });
		}

		// Telegram botga boradigan chiroyli xabar matni
		const messageText = `
🔔 <b>Yangi talaba ro'yxatdan o'tdi!</b>

👤 <b>Ismi:</b> ${fullName}
📧 <b>Email:</b> ${email || 'Kiritilmagan'}
📞 <b>Telefon:</b> ${phone || 'Kiritilmagan'}
📅 <b>Vaqti:</b> ${new Date().toLocaleString('uz-UZ')}
    `;

		// Botga yuboramiz
		await sendTelegramMessage(messageText);

		res.json({ success: true, message: 'Bildirishnoma botga yuborildi' });
	} catch (e) {
		console.error('Bildirishnoma xatosi:', e);
		res.status(500).json({ error: 'Xabar yuborishda xatolik yuz berdi' });
	}
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
