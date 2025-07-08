
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return 'Добро пожаловать в админ-панель EKRAN.TJ'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
