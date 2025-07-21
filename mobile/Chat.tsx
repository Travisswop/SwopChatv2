import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initXMTP, getClient } from '../shared/xmtpClient';
import { handleUserMessage } from '../shared/handleMessage';

export default function Chat() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const userAddress = '0xYourUserAddress'; // replace with dynamic address
  const privyProvider = {} as any; // replace with real Privy provider

  useEffect(() => {
    const load = async () => {
      const client = await initXMTP(userAddress, privyProvider);
      const convos = await client.conversations.list();
      console.log('🗂️ Conversations:', convos);
    };
    load();
  }, []);

  const handleSend = async () => {
    const botReply = await handleUserMessage(userInput, userAddress);
    setMessages(prev => [...prev, `👤 ${userInput}`, `🤖 ${botReply}`]);
    setUserInput('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messages}>
        {messages.map((msg, idx) => (
          <Text key={idx} style={styles.message}>{msg}</Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Ask the agent something..."
        value={userInput}
        onChangeText={setUserInput}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  messages: { flex: 1, marginBottom: 10 },
  message: { marginVertical: 4, fontSize: 16 },
  input: {
    height: 40, borderColor: '#ccc', borderWidth: 1,
    paddingHorizontal: 10, marginBottom: 10, borderRadius: 4,
  },
});// React Native chat UI wrapper
