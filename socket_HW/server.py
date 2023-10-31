import socket
import numpy as np
import time
import asyncio

def recvall(sock, count):
    buf = b''
    while count:
        newbuf = sock.recv(count)
        if not newbuf: return None
        buf += newbuf
        count -= len(newbuf)
    return buf

server_ip = '0.0.0.0'
server_port = 12345
image_path = '/home/ubuntu/websocket/cam.jpg'

while True:
    socket_server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    socket_server.bind((server_ip, server_port))
    socket_server.listen(10)

    conn, addr = socket_server.accept()

    try:
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