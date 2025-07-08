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

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
