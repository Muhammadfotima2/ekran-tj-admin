
let cart = [];

function addToCart(name, price, quantity) {
    if (!quantity || quantity <= 0) return;
    cart.push({ name, price, quantity });
    alert("✅ Товар добавлен в заказ");
}

function openSummary() {
    let cartItems = document.getElementById("cart-items");
    let totalBlock = document.getElementById("total");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const sum = item.price * item.quantity;
        total += sum;
        const el = document.createElement("div");
        el.textContent = `${item.name} — ${item.quantity}шт x ${item.price} = ${sum} сомонӣ`;
        cartItems.appendChild(el);
    });

    totalBlock.innerHTML = "💵 Общая сумма: " + total + " сомонӣ";
    document.getElementById("order-summary").style.display = "block";
}

function sendOrder() {
    const name = document.getElementById("client-name").value;
    const comment = document.getElementById("order-comment").value;
    if (!name || cart.length === 0) {
        alert("❗ Укажите имя и добавьте хотя бы один товар");
        return;
    }

    let text = `🛒 <b>Новый заказ</b>%0A👤 Имя: <b>${name}</b>%0A`;
    cart.forEach(item => {
        text += `📦 ${item.name} — ${item.quantity}шт x ${item.price} = ${item.price * item.quantity} сомонӣ%0A`;
    });

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    text += `💰 Общая сумма: <b>${total} сомонӣ</b>%0A`;
    if (comment) text += `💬 Комментарий: ${comment}%0A`;

    // Telegram
    const chat_id = "6172156061";
    const token = "7861896848:AAHJk1QcelFZ1owB0LO4XXNFflBz-WDZBIE";
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${text}&parse_mode=HTML`;

    fetch(url)
        .then(res => {
            alert("📦 Закази Шумо Қабул шуд. Ташаккур ки моро интихоб кардед!\n Дар кутоҳтарин муддат ба Шумо дар тамос мешавем, миннатдорем!");
            cart = [];
            document.getElementById("order-summary").style.display = "none";
        })
        .catch(() => alert("❌ Хатогӣ ҳангоми ирсоли фармоиш"));
}
