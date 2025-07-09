from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='public')

@app.route('/')
def admin_panel():
    return send_from_directory('public', 'admin.html')

if __name__ == '__main__':
    app.run()
