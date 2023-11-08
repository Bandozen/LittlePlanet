import base64
import eventlet
import socketio
import threading
import time
from dotenv import load_dotenv
import os

load_dotenv()

server_ip = os.getenv('SERVER_IP')
server_port = int(os.getenv('SERVER_PORT'))

sio = socketio.Server(cors_allowed_origins=["http://localhost:3000", "http://k9c203.p.ssafy.io:3000", "https://k9c203.p.ssafy.io", "http://littleplanet.kids:3000", "https://littleplanet.kids"])
app = socketio.WSGIApp(sio)
global email
email = None

# 이미지 업데이트 주기 (초)
image_update_interval = 0.2  # 예시: 5초마다 이미지 업데이트

def send_updated_image():
    global email
    image_path = f'/home/ubuntu/user/{email}/character.png'  # 이미지 경로로 대체
    while True:
        if os.path.exists(image_path):
            try:
                with open(image_path, 'rb') as image_file:
                    image_data = image_file.read()
                    image_base64 = base64.b64encode(image_data).decode('utf-8')
                    sio.emit('image', {'url': f'data:image/jpeg;base64,{image_base64}'})
            except Exception as e:
                print(f'Error sending image: {str(e)}')
        eventlet.sleep(image_update_interval)

@sio.event
def connect(sid, environ):
    global email
    email = environ.get('headers_raw')[4][1]
    print(f'mail: {email}')
    print(f'Client {sid} connected')
    image_thread = eventlet.spawn(send_updated_image)

@sio.event
def disconnect(sid):
    print(f'Client {sid} disconnected')

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen((server_ip, server_port)), app)
