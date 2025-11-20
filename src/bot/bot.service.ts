import { BotModule } from './bot.module';
import { Injectable } from '@nestjs/common';
import TelegramBot from "node-telegram-bot-api"

@Injectable()
export class BotService {
    private bot: TelegramBot
    private teacherId: number = Number(process.env.TEACHER_ID)

    constructor() {
        this.bot = new TelegramBot(process.env.BOT_TOKEN as string, { polling: true })

        this.bot.onText(/\/start/, (msg) => {
            const chatId: number = msg.chat.id
            const first_name: string = msg.from?.first_name || "unknown"

            if (chatId !== this.teacherId) {
                this.bot.sendMessage(chatId, "Murojaatingizni qoldiring")
                this.bot.sendMessage(this.teacherId, "Yangi student" + first_name)
            } else {
                this.bot.sendMessage(chatId, "Murojaatingizni qoldiring")
            }
        })

        // chat
        this.bot.on("message", (msg) => {
            const chatId: number = msg.chat.id
            const first_name: string = msg.from?.first_name || "unknown"

            // ustozga murojaat
            if(msg.text !== "/start" && chatId !== this.teacherId) {
                this.bot.sendMessage(this.teacherId, `chatId: ${chatId} ${first_name}: ${msg.text}`)
            }

            // studentga murojaat
            if(msg.text !== "/start" && msg.reply_to_message && chatId === this.teacherId) {
                const studentId = Number(msg.reply_to_message.text?.split(" ")[1] as string)

                this.bot.sendMessage(studentId, `${msg.text}`)
            }
        })
    }
}
