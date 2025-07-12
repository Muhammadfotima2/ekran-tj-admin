// Добавление товара в корзину
const cart = [];

function addToCart(model, quality, brand, price, quantity) {
  if (!quantity || quantity <= 0) return alert("❗ Укажите корректное количество");

  cart.push({ model, quality, brand, price, quantity });
  showToast("✅ Товар добавлен");
}

// Показываем тост-сообщение
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "green";
  toast.style.color = "white";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "10px";
  toast.style.zIndex = "9999";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// Открыть форму заказа
function openSummary() {
  const summary = document.getElementById('order-summary');
  if (summary) summary.style.display = 'block';

  const list = document.getElementById('cart-items');
  list.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement('div');
    const sum = item.price * item.quantity;
    total += sum;
    row.innerHTML = `📱 <b>${item.model}</b> | ${item.quality} | ${item.brand} — <b>${item.quantity}</b> шт = <b>${sum} сомонӣ</b>`;
    list.appendChild(row);
  });

  document.getElementById('total').innerHTML = `💰 Общая сумма: <b>${total} сомонӣ</b>`;
}

// Отправить заказ в Telegram
function sendOrder() {
  const name = document.getElementById("client-name").value.trim();
  const comment = document.getElementById("order-comment").value.trim();

  if (!name) return alert("❗ Пожалуйста, введите имя");

  let message = `🛒 <b>Новый заказ</b>%0A`;
  message += `👤 Имя: <b>${name}</b>%0A`;

  cart.forEach(item => {
    message += `📱 ${item.model} | ${item.quality} | ${item.brand} — ${item.quantity} шт = ${item.price * item.quantity} сомонӣ%0A`;
  });

  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `💰 Общая сумма: <b>${total} сомонӣ</b>%0A`;

  if (comment) message += `💬 Комментарий: ${comment}%0A`;

  message += `%0A🙏 <b>Ташаккур ки моро интихоб кардед!</b>%0A📦 Закази Шумо қабул шуд ва дар кутоҳтарин муддат ба Шумо дар тамос мешавем.`;

  // Заменить YOUR_BOT_TOKEN и YOUR_ADMIN_ID на реальные данные
  const TOKEN = '7861896848:AAHJk1QcelFZ1owB0LO4XXNFflBz-WDZBIE';
  const CHAT_ID = '6172156061';

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}&parse_mode=HTML`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        alert("✅  Ташаккур,ки моро интихоб кардед!\nЗакази Шумо Қабул шуд ва дар кутоҳтарин муддат\n ба Шумо дар тамос мешавем, миннатдорем!");
        location.reload();
      } else {
        alert("❌ Ошибка при отправке заказа");
      }
    })
    .catch(error => {
      console.error("Ошибка:", error);
      alert("❌ Не удалось отправить заказ");
    });
}
