import React, { useEffect, useState } from 'react';
import { initXMTP, getClient } from '../shared/xmtpClient';
import { handleUserMessage } from '../shared/handleMessage';

export default function Chat() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const userAddress = '0xYourUserAddress'; // replace with actual address from Privy
  const privyProvider = {} as any; // replace with actual provider

  useEffect(() => {
    const load = async () => {
      const client = await initXMTP(userAddress, privyProvider);
      const convos = await client.conversations.list();
      console.log('🧠 Web Conversations:', convos);
    };
    load();
  }, []);

  const handleSend = async () => {
    const botReply = await handleUserMessage(userInput, userAddress);
    setMessages(prev => [...prev, `🧑 ${userInput}`, `🤖 ${botReply}`]);
    setUserInput('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.messages}>
        {messages.map((msg, idx) => (
          <div key={idx} style={styles.message}>{msg}</div>
        ))}
      </div>
      <input
        style={styles.input}
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleSend} style={styles.button}>Send</button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'sans-serif',
  },
  messages: {
    marginBottom: '10px',
    minHeight: '200px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
  },
  message: {
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '8px',
    borderRadius: '4px',
    border: '1px solid #aaa',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#222',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
// Web chat UI wrapper
