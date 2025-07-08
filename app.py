import os
import json
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('catalog.html')

@app.route('/orders', methods=['GET'])
def get_orders():
    with open('orders.json', 'r', encoding='utf-8') as file:
        orders = json.load(file)
    return jsonify(orders)

@app.route('/orders', methods=['POST'])
def save_order():
    data = request.json
    if not data:
        return jsonify({'status': 'error', 'message': 'Нет данных'}), 400

    try:
        with open('orders.json', 'r', encoding='utf-8') as file:
            orders = json.load(file)
    except FileNotFoundError:
        orders = []

    orders.append(data)

    with open('orders.json', 'w', encoding='utf-8') as file:
        json.dump(orders, file, ensure_ascii=False, indent=4)

    return jsonify({'status': 'ok'})
    
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 3000))
    app.run(host='0.0.0.0', port=port)
