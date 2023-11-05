const WebSocket = require('ws');
const http = require('http');

// HTTP 서버 생성
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running');
});

// WebSocket 서버 생성
const wss = new WebSocket.Server({ server });

// IP를 key로, 웹소켓 배열을 value로 갖는 Map
let clients = [];

// 클라이언트가 연결될 때 실행될 콜백
wss.on('connection', (ws, req) => {
  console.log('Client connected');
  console.log(req.headers["x-forwarded"] || req.socket.remoteAddress)
  console.log(req.socket.remoteAddress)
  const ip = req.headers["x-forwarded"] || req.socket.remoteAddress
  ws.ip = ip
  if (ws.readyState === ws.OPEN) {
    ws.send(`Server: Welcome Client[${ip}]`);
  }
  clients.push(ws)
  console.log(clients)
  // 클라이언트로부터 메시지를 수신할 때 실행될 콜백
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    console.log(wss.clients)
    // 메시지를 다시 클라이언트로 보내기
    clients.forEach((client) => {
      client.send(`${message}`)
    })
    
  });

  // 클라이언트와 연결이 끊겼을 때 실행될 콜백
  ws.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter((client) => client !== ws);
  });
});

// 서버를 7777 포트에서 시작
server.listen(7777, () => {
  console.log('WebSocket server is listening on port 7777');
});
