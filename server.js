const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = '7861896848:AAHJk1QcelFZ1owB0LO4XXNFflBz-WDZBIE';
const CHAT_ID = '6172156061';

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/order', async (req, res) => {
  const { product, price, quantity, total, user } = req.body;

  const text = `
<b>Новый заказ из Telegram WebApp</b>
<b>Пользователь:</b> ${user.first_name} (@${user.username})
<b>ID:</b> ${user.id}
<b>Модель:</b> ${product}
<b>Цена:</b> ${price} x ${quantity}
<b>Итого:</b> ${total} сомонӣ
  `;

  try {
    await axios.post(https://api.telegram.org/bot${BOT_TOKEN}/sendMessage, {
      chat_id: CHAT_ID,
      text,
      parse_mode: 'HTML'
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Ошибка Telegram:', err.message);
    res.status(500).json({ error: 'Ошибка Telegram' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер на порту ${PORT}`);
});
