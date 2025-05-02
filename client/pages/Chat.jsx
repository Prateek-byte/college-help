import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socket.emit('join', 'global');
    socket.on('message', msg => setMessages(prev => [...prev, msg]));
    return () => socket.disconnect();
  }, []);

  const send = () => {
    socket.emit('message', { room: 'global', user: 'Anonymous', text });
    setText('');
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>{messages.map((m, i) => <div key={i}>{m.user}: {m.text}</div>)}</div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
