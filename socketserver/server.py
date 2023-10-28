import asyncio
import websockets
import socket
import numpy as np
import time
import os
from dotenv import load_dotenv

load_dotenv()

EC2_PORT=os.getenv('EC2_PORT')
EC2_WEBSOCKET_PORT=os.getenv('EC2_WEBSOCKET_PORT')

def recvall(sock, count):
    buf = b''
    while count:
        newbuf = sock.recv(count)
        if not newbuf:
            return None
        buf += newbuf
        count -= len(newbuf)
    return buf

async def image_server(websocket, path):
    # 이미지를 소켓 통신을 통해 받음
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('0.0.0.0', EC2_PORT))
    server_socket.listen(10)
    
    # 클라이언트 연결 기다림
    client_socket, client_address = server_socket.accept()
    
    try:
        while True:
            length = recvall(client_socket, 16)
            if length is not None:
                stringData = recvall(client_socket, int(length))
                data = np.frombuffer(stringData, dtype='uint8')
                await websocket.send(data.tobytes())
            else:
                break

    except websockets.ConnectionClosed:
        print("클라이언트와의 연결이 종료되었습니다.")
    except KeyboardInterrupt:
        client_socket.close()
        server_socket.close()

    client_socket.close()
    server_socket.close()
    time.sleep(5)

async def main():
    start_server = websockets.serve(image_server, "0.0.0.0", EC2_WEBSOCKET_PORT)
    await start_server

if __name__=="__main__":
    asyncio.get_event_loop().run_until_complete(main())
    asyncio.get_event_loop().run_forever()


