let cart = [];

// Добавить товар в корзину
function addToCart(button) {
    const card = button.closest('.product-card');
    const name = card.querySelector('h3').textContent.trim();
    const quality = card.querySelector('p:nth-of-type(1)').textContent.trim();
    const brand = card.querySelector('p:nth-of-type(2)').textContent.trim();
    const priceText = card.querySelector('p:nth-of-type(3)').textContent.trim();
    const price = parseInt(priceText.replace(/[^0-9]/g, ''));
    const quantity = parseInt(card.querySelector('input').value);

    const item = { name, quality, brand, price, quantity };
    cart.push(item);
    alert('🛒 Товар добавлен в заказ!');
}

// Открыть сводку заказа
function openSummary() {
    const list = document.getElementById('order-list');
    const total = document.getElementById('order-total');
    list.innerHTML = '';
    let sum = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} — ${item.quantity} шт. × ${item.price} сом = ${item.price * item.quantity} сом`;
        list.appendChild(li);
        sum += item.price * item.quantity;
    });

    total.textContent = `💰 Общая сумма: ${sum} сомони`;
    document.getElementById('order-summary').style.display = 'block';
}

// Отправить заказ в Telegram
function sendOrder() {
    const comment = document.getElementById('order-comment').value.trim();
    let message = '🛍 Новый заказ:\n\n';
    cart.forEach(item => {
        message += `📱 ${item.name}\n🛠 ${item.quality}\n🏷 ${item.brand}\n🔢 ${item.quantity} × ${item.price} = ${item.price * item.quantity} сом\n\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `💰 Общая сумма: ${total} сомони\n`;
    if (comment) message += `📝 Комментарий: ${comment}`;

    fetch('https://api.telegram.org/bot7861896848:AAHJk1QcelFZ1owB0LO4XXNFflBz-WDZBIE/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: 6172156061,
            text: message
        })
    }).then(() => {
        alert('✅ Ташаккур,ки моро интихоб кардед!\nЗакази Шумо Қабул шуд ва дар кутоҳтарин муддат\n ба Шумо дар тамос мешавем, миннатдорем!');
        cart = [];
        document.getElementById('order-summary').style.display = 'none';
    }).catch(() => {
        alert('❌ Ошибка при отправке заказа.');
    });
}
