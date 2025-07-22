// Подключаем SDK
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand(); // Развернуть на весь экран

function setupOrderButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach(button => {
    if (button.textContent.includes("🛒 Заказать")) {
      button.addEventListener('click', async () => {
        const container = button.parentElement;

        const product = container.querySelector('div').textContent.trim();
        const priceText = [...container.querySelectorAll('div')].find(el => el.textContent.includes("Цена"));
        const price = priceText ? parseInt(priceText.textContent.replace('💰 Цена:', '').trim()) : 0;
        const quantity = parseInt(container.querySelector('input[type="number"]').value || "1");
        const total = price * quantity;

        const user = tg.initDataUnsafe.user || {};

        const data = {
          product,
          price,
          quantity,
          total,
          user: {
            id: user.id,
            first_name: user.first_name,
            username: user.username || 'нет username'
          }
        };

        try {
          const res = await fetch('/order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (res.ok) {
            tg.close(); // Закрываем WebApp после заказа
          } else {
            alert('❌ Ошибка при отправке заказа');
          }
        } catch (err) {
          alert('⚠️ Ошибка соединения с сервером');
          console.error(err);
        }
      });
    }
  });
}

window.onload = setupOrderButtons;
