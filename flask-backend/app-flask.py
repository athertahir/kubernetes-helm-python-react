import os

from api._rest_api import app

if __name__ == '__main__':
    app.debug = False
    app.secret_key = 'super secret key'
    host = os.environ.get('IP', '0.0.0.0')  # 'localhost'
    port = int(os.environ.get('PORT', 5000))
    app.run(host=host, port=port)
    print('Server started!')
