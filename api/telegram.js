export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, answers, type = 'Quiz' } = request.body;

    // Получаем секретные данные из переменных окружения
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error('Telegram credentials not configured');
    }

    // Формируем красивое сообщение
    let message = `🔥 *НОВАЯ ЗАЯВКА (${type})* 🔥\n\n`;
    message += `👤 *Имя:* ${name}\n`;
    message += `📞 *Телефон:* ${phone}\n`;
    
    if (answers && Object.keys(answers).length > 0) {
      message += `\n📋 *Ответы:* \n`;
      // Преобразуем объект ответов в читаемый текст
      for (const [key, value] of Object.entries(answers)) {
        // Пропускаем технические поля
        if (key === 'expertLevel') continue;
        
        let formattedValue = value;
        if (Array.isArray(value)) formattedValue = value.join(', ');
        
        message += `- *${key}:* ${formattedValue}\n`;
      }
    }

    message += `\n⏰ *Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

    // Отправляем в Telegram
    const tgUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    
    const tgResponse = await fetch(tgUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!tgResponse.ok) {
      throw new Error('Failed to send to Telegram');
    }

    return response.status(200).json({ success: true });

  } catch (error) {
    console.error('Telegram Error:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
