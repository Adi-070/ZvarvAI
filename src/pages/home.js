'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Genre definitions
const genres = [
  {
    id: "movies-tv",
    name: "Movies & TV Shows",
    description: "Characters from popular films and television series"
  },
  {
    id: "literature",
    name: "Literature",
    description: "Classic and contemporary book characters"
  },
  {
    id: "historical",
    name: "Historical Figures",
    description: "Notable personalities from history"
  }
];

// Bot definitions organized by genre
const botsByGenre = {
  "movies-tv": [
    { 
      id: "yoda", 
      name: "Yoda", 
      description: "Wise Jedi Master from Star Wars",
      avatar: "/characters/yoda.jpg",
      accentColor: "from-green-500 to-green-700",
      greeting: "Hmm, sense many questions in you, I do. Share them, you must."
    },
    { 
      id: "ironman", 
      name: "Tony Stark", 
      description: "Genius billionaire with wit and sarcasm",
      avatar: "/characters/Tony.webp",
      accentColor: "from-red-500 to-red-700",
      greeting: "JARVIS, we have company. What can I help you with today?"
    },
    { 
      id: "RustCohle", 
      name: "Rust Cohle", 
      description: "Dark, cynical detective from True Detective",
      avatar: "/characters/Rust.webp",
      accentColor: "from-gray-600 to-gray-800",
      greeting: "Time is a flat circle. What's on your mind?"
    }
  ],
  "literature": [
    { 
      id: "sherlock", 
      name: "Sherlock Holmes", 
      description: "Brilliant detective known for logical reasoning",
      avatar: "/characters/sherlock.jpg",
      accentColor: "from-blue-500 to-blue-700",
      greeting: "Elementary, my dear friend. What case shall we solve today?"
    }
  ],
  "historical": []
};

// Component definitions remain the same as in your original code
const BotCard = ({ bot, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full"
  >
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all h-full"
      onClick={onClick}
    >
      <div className={`h-2 bg-gradient-to-r ${bot.accentColor} rounded-t-lg`} />
      <CardHeader className="p-4 sm:p-6">
        <img 
          src={bot.avatar} 
          alt={bot.name} 
          className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full shadow-lg" 
        />
        <CardTitle className="text-center text-base sm:text-lg">{bot.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <CardDescription className="text-center text-sm sm:text-base">{bot.description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const GreetingMessage = ({ content, botName }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="bg-white">
      <CardHeader className="py-2 px-3 sm:py-3 sm:px-6">
        <CardTitle className="text-sm font-medium">{botName}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base">{content}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const ChatMessage = ({ userMessage, botMessage, botName }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col gap-3 sm:gap-4"
  >
    <Card className="bg-blue-50">
      <CardHeader className="py-2 px-3 sm:py-3 sm:px-6">
        <CardTitle className="text-sm font-medium">You</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base">{userMessage}</p>
      </CardContent>
    </Card>
    <Card className="bg-white">
      <CardHeader className="py-2 px-3 sm:py-3 sm:px-6">
        <CardTitle className="text-sm font-medium">{botName}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base">{botMessage}</p>
      </CardContent>
    </Card>
  </motion.div>
);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-900 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {!selectedBot ? (
          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-white/50 backdrop-blur-sm outline outline-2 outline-black shadow-md">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl">Choose Your Companion</CardTitle>
                <CardDescription className="text-sm sm:text-base">Select a genre to find your perfect conversation partner</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <Tabs defaultValue={selectedGenre} onValueChange={setSelectedGenre}>
                  <TabsList className="grid w-full grid-cols-3 gap-1">
                    {genres.map((genre) => (
                      <TabsTrigger 
                        key={genre.id} 
                        value={genre.id} 
                        className="text-gray-800 text-xs sm:text-sm hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white px-2 py-1 sm:px-4 sm:py-2"
                      >
                        {genre.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {botsByGenre[selectedGenre].map((bot) => (
                <BotCard 
                  key={bot.id} 
                  bot={bot} 
                  onClick={() => handleBotSelect(bot)} 
                />
              ))}
              {botsByGenre[selectedGenre].length === 0 && (
                <Card className="col-span-full p-4 sm:p-6">
                  <CardContent className="text-center text-gray-500 text-sm sm:text-base">
                    No characters available in this genre yet.
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <Card className={`bg-gradient-to-r ${selectedBot.accentColor}`}>
            <CardHeader className="flex flex-row items-center justify-between text-white p-3 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <img 
                  src={selectedBot.avatar} 
                  alt={selectedBot.name} 
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-white" 
                />
                <div>
                  <CardTitle className="text-base sm:text-lg">{selectedBot.name}</CardTitle>
                  <CardDescription className="text-gray-100 text-xs sm:text-sm">
                    {selectedBot.description}
                  </CardDescription>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-white hover:bg-white/20"
                onClick={() => {
                  setSelectedBot(null);
                  setChatHistory([]);
                }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to characters</span>
              </Button>
            </CardHeader>
          </Card>

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

            <Card>
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-4">
                  <Textarea 
                    placeholder="Ask a question..." 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)} 
                    className="resize-none flex-grow text-sm sm:text-base"
                    rows={1} 
                  />
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="self-end"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}