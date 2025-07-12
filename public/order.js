let cart = [];

function addToCart(button) {
    const card = button.closest('.product-card');
    const name = card.querySelector('.product-name').innerText;
    const quality = card.querySelector('.product-quality').innerText;
    const brand = card.querySelector('.product-brand').innerText;
    const priceText = card.querySelector('.product-price').innerText;
    const quantityInput = card.querySelector('.product-quantity');

    const price = parseInt(priceText.replace(/[^0-9]/g, ''));
    const quantity = parseInt(quantityInput.value);

    if (!quantity || quantity <= 0) {
        alert("❗ Укажите корректное количество");
        return;
    }

    const existing = cart.find(item => item.name === name && item.quality === quality && item.brand === brand && item.price === price);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ name, quality, brand, price, quantity });
    }

    alert("✅ Товар добавлен в заказ!");
}

function openSummary() {
    const summary = document.getElementById('order-summary');
    const cartItems = document.getElementById('cart-items');
    const totalDiv = document.getElementById('total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.textContent = `📱 ${item.name} | ${item.quality} | ${item.brand} | ${item.quantity}шт x ${item.price} = ${item.quantity * item.price} сомони`;
        cartItems.appendChild(itemEl);
        total += item.quantity * item.price;
    });

    totalDiv.innerHTML = `💵 Общая сумма: ${total} сомонӣ`;
    summary.style.display = 'block';
}

function sendOrder() {
    const name = document.getElementById('client-name').value.trim();
    const comment = document.getElementById('order-comment').value.trim();

    if (!name || cart.length === 0) {
        alert("❗ Укажите имя и добавьте хотя бы один товар");
        return;
    }

    let text = `📦 Новый заказ:
👤 Имя: ${name}
`;
    cart.forEach(item => {
        text += `📱 ${item.name} | 🔧 ${item.quality} | 🏷 ${item.brand} | 🔢 ${item.quantity} x 💰 ${item.price} = ${item.quantity * item.price} сомони
`;
    });

    let total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    text += `💵 Общая сумма: ${total} сомони
`;
    if (comment) {
        text += `💬 Комментарий: ${comment}`;
    }

    fetch("https://api.telegram.org/bot7861896848:AAHJk1QcelFZ1owB0LO4XXNFflBz-WDZBIE/sendMessage", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: 6172156061,
            text: text
        })
    }).then(res => {
        alert("📨 Ташаккур ки моро интихоб кардед! Закази Шумо Қабул шуд ва дар кутоҳтарин муддат ба Шумо дар тамос мешавем.");
        cart = [];
        document.getElementById('order-summary').style.display = 'none';
    });
}
