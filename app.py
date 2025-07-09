from flask import Flask, render_template

app = Flask(name)

@app.route('/')
def home():
    return '<h2>✅ Сервер работает. Перейдите на <a href="/admin">/admin</a></h2>'

@app.route('/admin')
def admin_panel():
    return render_template('admin.html')

if name == 'main':
    app.run(host='0.0.0.0', port=8080)

