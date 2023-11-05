import socket
from _thread import *
import subprocess

from dotenv import load_dotenv
import os

load_dotenv()

server_ip = os.getenv('SERVER_IP')
server_port = int(os.getenv('SERVER_PORT'))

print('start')
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind((server_ip, server_port))
server_socket.listen()

def recvall(sock, count):
    buf = b''
    while count:
        newbuf = sock.recv(count)
        if not newbuf: return None
        buf += newbuf
        count -= len(newbuf)
    return buf

def threaded(client_socket, addr):
    email_length = recvall(client_socket, 16)
    if email_length is not None:
        email_data = recvall(client_socket, int(email_length))
        email = email_data.decode()
        subprocess.Popen(["python3", "/home/ubuntu/character/trans.py", email])

    
    client_socket.close()

try:
    while True:
        client_socket, addr = server_socket.accept()
        start_new_thread(threaded, (client_socket, addr))

except Exception as e:
    print(e)

finally:
    server_socket.close()