FROM python:3.8

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y python3-pip

RUN pip install -r requirements.txt

EXPOSE 18090
EXPOSE 12345
EXPOSE 18091
EXPOSE 12346

CMD ["python3", "server.py"]