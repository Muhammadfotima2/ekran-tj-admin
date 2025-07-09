from flask import Flask, send_from_directory

app = Flask(name, static_folder='public')

@app.route('/')
def admin_panel():
    return send_from_directory('public', 'admin.html')

if name == '__main__':
    app.run()
