import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const newsData = [
  {
    title: "Qaraqalpoq tili kuni nishonlandi",
    category: "Madaniyat",
    date: "2025-04-20",
    author: "Admin",
    image: "/images/til-kuni.jpg",
    summary: "Universitetda til bayramiga bag‘ishlangan adabiy kecha o‘tkazildi...",
    content: "To‘liq maqola matni bu yerda bo‘ladi..."
  },
  {
    title: "Talabalar uchun yangi grant dasturi e'lon qilindi",
    category: "O‘quv",
    date: "2025-04-18",
    author: "Admin",
    image: "/images/grant.jpg",
    summary: "Yosh tadqiqotchilar uchun yangi ilmiy loyiha dasturi...",
    content: "Grant olish shartlari haqida to‘liq ma'lumot bu yerda..."
  },
];

export default function Yangiliklar() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">Yangiliklar</h1>

      <div className="mb-6 flex justify-center gap-4">
        <Input placeholder="Qidiruv..." className="max-w-sm" />
        <Button>Izlash</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {newsData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={item.image} alt={item.title} className="rounded-t-2xl h-60 w-full object-cover" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge>{item.category}</Badge>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-700 mb-2">{item.summary}</p>
                <span className="text-sm text-gray-500 italic">Muallif: {item.author}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
