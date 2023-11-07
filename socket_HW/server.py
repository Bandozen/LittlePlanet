import socket
from _thread import *
import subprocess
import redis

from dotenv import load_dotenv
import os

load_dotenv()

server_ip = os.getenv('SERVER_IP')
server_port = int(os.getenv('SERVER_PORT'))

redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT')
redis_password = os.getenv('REDIS_PASSWORD')

redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, charset="utf-8", decode_responses=True, db=1)

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
    while True:
        email_length = recvall(client_socket, 16)
        if email_length is not None:
            email_data = recvall(client_socket, int(email_length))
            email = email_data.decode()
            value = redis_client.get(email)
            if value == "start":
                subprocess.Popen(["python3", "/home/ubuntu/character/trans.py", email])
            elif value == "cam":
                continue
            else:
                client_socket.close()
                break

    # email_length = recvall(client_socket, 16)
    # if email_length is not None:
    #     email_data = recvall(client_socket, int(email_length))
    #     email = email_data.decode()
    #     value = redis_client.get(email)
    #     if value == "cam":

    #     elif value == "start":
    #         subprocess.Popen(["python3", "/home/ubuntu/character/trans.py", email])
    
    # client_socket.close()

try:
    while True:
        client_socket, addr = server_socket.accept()
        start_new_thread(threaded, (client_socket, addr))

except Exception as e:
    print(e)

finally:
    server_socket.close()