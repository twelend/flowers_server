require('dotenv').config()
const TgApi = require('node-telegram-bot-api')
const TOKEN = process.env.TG_TOKEN

const bot = new TgApi(TOKEN, {
    polling: true
})

const start = () => {
    bot.on('text', async (msg) => {
        const chatId = msg.chat.id
        if (msg.text === '/start') {
            await bot.sendMessage(chatId, 'Привет, я бот-флорист. Сейчас расскажу как со мной работать.\n\nВ момент когда приходит заявка необходимо нажать кнопку \n"⏰ Взять в работу ⏰"\nВы увидите текст "⏳Заявка обрабатывается⏳"\nЭто сделано для того, чтобы другие операторы не обрабатывали одну заявку повторно \n\nЕсли заявка выполнена, нажмите "Выполнено"')
        }
    })

    bot.on('callback_query', async (msg) => {
        const chatId = msg.message.chat.id
        if (msg.data === '/inprocess') {
            const sentMessage = await bot.sendMessage(chatId, '⏳Заявка обрабатывается⏳', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Выполнено', callback_data: '/completed' },
                        ],
                    ],
                },
            })
            bot.on('callback_query', async (callbackQuery) => {
                if (callbackQuery.data === '/completed') {
                    await bot.deleteMessage(chatId, sentMessage.message_id);
                    await bot.sendMessage(chatId, '✅ Заявка обработанна');
                }
            });
        }
    })
}


start()