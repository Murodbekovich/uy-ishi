import { Injectable } from '@nestjs/common';
import TelegramBot from "node-telegram-bot-api";

@Injectable()
export class BotService {
    private bot: TelegramBot;

    constructor() {
        this.bot = new TelegramBot(process.env.BOT_TOKEN as string, { polling: true });

        // Mahsulotla
        const products = {
            ichimliklar: [
                { id: "tea", title: "Choy", price: 5000, desc: "Qora choy", photo: "https://i.imgur.com/8yK8Z3j.png" },
                { id: "coffee", title: "Kofe", price: 10000, desc: "Issiq latte", photo: "https://i.imgur.com/eI4R3Go.png" }
            ],
            yeguliklar: [
                { id: "hotdog", title: "Hot-dog", price: 14000, desc: "Sosiska", photo: "https://i.imgur.com/j1S6R7h.png" },
                { id: "fries", title: "Kartoshka fri", price: 9000, desc: "kartoshka", photo: "https://i.imgur.com/D3zjZpy.png" }
            ],
            shirinliklar: [
                { id: "donut", title: "Donut", price: 7000, desc: "Shokoladli donut", photo: "https://i.imgur.com/OhlW2vG.png" }
            ]
        };

        // start
        this.bot.onText(/\/start/, (msg) => {
            const chatId = msg.chat.id;
            const name = msg.from?.first_name || "Do‘stim";

            this.bot.sendMessage(chatId, `Salom, ${name}! Telefon raqamingizni yuboring.`, {
                reply_markup: {
                    keyboard: [
                        [{ text: "Telefon raqamni yuborish", request_contact: true }]
                    ],
                    resize_keyboard: true
                }
            });
        });

        // CONTOCT
        this.bot.on("contact", (msg) => {
            const chatId = msg.chat.id;

            this.bot.sendMessage(chatId, "Joylashuvingizni yuboring:", {
                reply_markup: {
                    keyboard: [
                        [{ text: "Lokatsiyani yuborish", request_location: true }]
                    ],
                    resize_keyboard: true
                }
            });
        });

        this.bot.on("location", (msg) => {
            const chatId = msg.chat.id;

            this.bot.sendMessage(chatId, "Bo‘limni tanlang:", {
                reply_markup: {
                    keyboard: [
                        [{ text: "Ichimliklar" }],
                        [{ text: "Yeguliklar" }],
                        [{ text: "Shirinliklar" }]
                    ],
                    resize_keyboard: true
                }
            });
        });

        this.bot.on("message", (msg) => {
            const chatId = msg.chat.id;
            const text = msg.text;

            if (text === "Ichimliklar") return this.sendProductList(chatId, products.ichimliklar);
            if (text === "Yeguliklar") return this.sendProductList(chatId, products.yeguliklar);
            if (text === "Shirinliklar") return this.sendProductList(chatId, products.shirinliklar);
        });

        this.bot.on("callback_query", (query) => {
            const chatId = query.message!.chat.id;
            const productId = query.data;

            const allProducts = [
                ...products.ichimliklar,
                ...products.yeguliklar,
                ...products.shirinliklar
            ];

            const product = allProducts.find(p => p.id === productId);
            if (!product) return;

            const desc = `${product.title}\nNarxi: ${product.price} so‘m\n\n${product.desc}`;

            this.bot.sendPhoto(chatId, product.photo, {
                caption: desc,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🛒 Buyurtma berish", callback_data: `order_${product.id}` }]
                    ]
                }
            });
        });

        // Buyurtma atish
        this.bot.on("callback_query", (query) => {
            if (!query.data?.startsWith("order_")) return;

            const chatId = query.message!.chat.id;
            const prodName = query.data.replace("order_", "");

            this.bot.sendMessage(chatId, `Buyurtmangiz qabul qilindi!\nMahsulot: ${prodName}`);
        });
    }

    private sendProductList(chatId: number, items: any[]) {
        this.bot.sendMessage(chatId, "Mahsulotni tanlang:", {
            reply_markup: {
                inline_keyboard: items.map(i => [
                    { text: `${i.title} - ${i.price} so‘m`, callback_data: i.id }
                ])
            }
        });
    }
}