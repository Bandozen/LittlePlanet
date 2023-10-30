import socket
# import cv2
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
                # frame = cv2.imdecode(data, cv2.IMREAD_COLOR)
                # cv2.namedWindow('cam', cv2.WINDOW_NORMAL)
                # cv2.imshow('cam', frame)
                # cv2.waitKey(1)

            else:
                # cv2.destroyAllWindows()
                break

    except KeyboardInterrupt:
        conn.close()
        socket_server.close()

    conn.close()
    socket_server.close()
    time.sleep(5)