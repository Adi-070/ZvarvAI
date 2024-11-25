'use client'

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { GenreSelector } from "../components/GenreSelector";
import { BotGrid } from "../components/BotGrid";
import { ChatHeader } from "../components/ChatHeader";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { GreetingMessage } from "../components/GreetingMessage";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("movies-tv");
  const [selectedBot, setSelectedBot] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBotSelect = (bot) => {
    setSelectedBot(bot);
    setChatHistory([{ type: 'bot', content: bot.greeting }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !selectedBot) return;

    setLoading(true);
    const userMessage = prompt;
    setPrompt("");

    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage, bot: selectedBot.id }),
      });

      if (!res.ok) throw new Error('Failed to fetch response from API');

      const data = await res.json();
      const botResponse = data.response || "No response from the bot.";
      
      setChatHistory(prev => [...prev, 
        { type: 'user', content: userMessage },
        { type: 'bot', content: botResponse }
      ]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory(prev => [...prev,
        { type: 'user', content: userMessage },
        { type: 'bot', content: "An error occurred while processing your request." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getMessagePairs = () => {
    const pairs = [];
    for (let i = 1; i < chatHistory.length; i += 2) {
      pairs.push({
        userMessage: chatHistory[i].content,
        botMessage: chatHistory[i + 1]?.content
      });
    }
    return pairs;
  };

  const handleBack = () => {
    setSelectedBot(null);
    setChatHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-900 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {!selectedBot ? (
          <div className="space-y-4 sm:space-y-6">
            <GenreSelector 
              selectedGenre={selectedGenre} 
              onGenreChange={setSelectedGenre} 
            />
            <BotGrid 
              selectedGenre={selectedGenre} 
              onBotSelect={handleBotSelect} 
            />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <ChatHeader bot={selectedBot} onBack={handleBack} />
            
            <div className="space-y-4">
              <AnimatePresence>
                {chatHistory.length > 0 && (
                  <GreetingMessage 
                    content={chatHistory[0].content}
                    botName={selectedBot.name}
                  />
                )}
                {getMessagePairs().map((pair, index) => (
                  <ChatMessage 
                    key={index}
                    userMessage={pair.userMessage}
                    botMessage={pair.botMessage}
                    botName={selectedBot.name}
                  />
                ))}
              </AnimatePresence>
            </div>

            <ChatInput 
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
}