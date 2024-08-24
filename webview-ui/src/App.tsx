// import { vscode } from "./utilities/vscode";
// import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import React, { useState } from 'react';
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: 'sk-5IRLU3mdqxjA6GXXKeX-YlRXg2_x-EjfRb2oBNdlqcT3BlbkFJmaWyvQhL-Lzcs8VVCe2YM9XajS9gql-Ovj-AKpjzgA',dangerouslyAllowBrowser: true });

// Define types for the API response and message objects


type Message = {
  text: string;
  response: string;
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = async () => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content:input,
            },
        ],
    });

      if (!completion.choices) {
        throw new Error('Network response was not ok');
      }

      const data = completion;
      setMessages([...messages, { text: input, response: String(data.choices[0].message) }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-900 text-gray-100">
      <div id="chat-messages" className="flex-1 overflow-y-auto p-2 bg-gray-800 shadow-md rounded-lg">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">
            Welcome to GitGPT! Enter your query regarding Git commands.
          </p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold text-blue-300">User:</p>
              <p className="bg-gray-700 p-2 rounded-lg">{message.text}</p>
              <p className="font-bold text-green-300 mt-2">AI:</p>
              <p className="bg-gray-700 p-2 rounded-lg">{message.response}</p>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;

