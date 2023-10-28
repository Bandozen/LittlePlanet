FROM python:3.7

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

EXPOSE 18090
EXPOSE 12345
EXPOSE 18091

CMD ["python3", "server.py"]