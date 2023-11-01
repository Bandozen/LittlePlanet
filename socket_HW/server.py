import socket
import numpy as np
import time
import asyncio
from dotenv import load_dotenv
import os

load_dotenv()

server_ip = os.getenv('SERVER_IP')
server_port = int(os.getenv('SERVER_PORT'))

def recvall(sock, count):
    buf = b''
    while count:
        newbuf = sock.recv(count)
        if not newbuf: return None
        buf += newbuf
        count -= len(newbuf)
    return buf

while True:
    socket_server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    socket_server.bind((server_ip, server_port))
    socket_server.listen(10)

    conn, addr = socket_server.accept()

    try:
        email_length = recvall(conn, 16)
        if email_length is not None:
            email_data = recvall(conn, int(email_length))
            email = email_data.decode()
            image_path = f'/home/ubuntu/user/{email}/cam.jpg'
            while True:
                length = recvall(conn, 16)
                if length is not None:
                    stringData = recvall(conn, int(length))
                    data = np.frombuffer(stringData, dtype = 'uint8')
                    with open(image_path, 'wb') as image_file:
                        image_file.write(data)

                else:
                    break

    except KeyboardInterrupt:
        conn.close()
        socket_server.close()

    conn.close()
    socket_server.close()
    time.sleep(5)