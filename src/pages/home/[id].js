'use client'

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import { supabase } from "../../../lib/supabase";
import { ChatHeader } from "../../components/ChatHeader";
import { ChatMessage } from "../../components/ChatMessage";
import { ChatInput } from "../../components/ChatInput";
import { GreetingMessage } from "../../components/GreetingMessage";
import Link from "next/link";
import { PlusCircle, ArrowLeft } from 'lucide-react';
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"


export default function BotDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [bot, setBot] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch bot details when the page loads
  useEffect(() => {
    const fetchBotDetails = async () => {
      if (!id) return;
    
      try {
        // First check if it's a predefined bot
        const { data: predefinedBot, error: predefinedBotError } = await supabase
          .from('predefined_bots')
          .select('*')
          .eq('id', id)
          .single();
  
        if (predefinedBot && !predefinedBotError) {
          setBot(predefinedBot);
          setChatHistory([{ type: 'bot', content: predefinedBot.greeting || "Hello! I'm ready to chat." }]);
        } else {
          // If it's not a predefined bot, check the custom bots
          const { data: customBot, error: customBotError } = await supabase
            .from('custom_bots')
            .select('*')
            .eq('id', id)
            .single();
  
          if (customBot && !customBotError) {
            setBot(customBot);
            setChatHistory([{ type: 'bot', content: customBot.greeting || "Hello! I'm ready to chat." }]);
          } else {
            router.push('/home'); // If neither bot is found, redirect to home
          }
        }
      } catch (error) {
        console.error('Error fetching bot details:', error);
        router.push('/home');
      }
    };
  
    fetchBotDetails();
  }, [id, router]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !bot) return;
  
    setLoading(true);
    const userMessage = prompt;
    setPrompt("");


  
    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: userMessage, 
          bot: bot.id 
        }),
      });
  
      const responseText = await res.text();
      console.log('API Response:', res);
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}, response: ${responseText}`);
      }
  
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Failed to parse API response');
      }
  
      const botResponse = data.response || "No response from the bot.";
      
      setChatHistory(prev => [...prev, 
        { type: 'user', content: userMessage },
        { type: 'bot', content: botResponse }
      ]);
    } catch (error) {
      console.error("Detailed Error:", error);
      
      const errorMessage = error.message || "An unexpected error occurred";
      
      setChatHistory(prev => [...prev,
        { type: 'user', content: userMessage },
        { type: 'bot', content: `Error: ${errorMessage}` }
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
    router.push('/home');
  };



if (!bot) return (
  <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            bounce: 0.4
          }}
          className="flex flex-col items-center space-y-6"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-primary/10 rounded-full animate-pulse"></div>
            <div className="relative z-10 bg-primary/20 p-4 rounded-full">
              <Loader2 
                className="w-16 h-16 text-purple-500 animate-spin" 
                strokeWidth={1.5} 
              />
            </div>
          </motion.div>
          
       
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              delay: 0.6,
              duration: 0.5 
            }}
            className="flex space-x-2"
          >
            {[1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: dot * 0.2
                }}
                className="w-3 h-3 bg-primary/50 rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  </div>
);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-900 p-3 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBack} 
            className="flex items-center gap-2 text-purple-700 hover:text-purple-900"
          >
            <ArrowLeft size={24} />
            <span>Back to Bots</span>
          </button>
          <Link 
            href="/create-bot"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <PlusCircle size={20} />
            <span>Create Bot</span>
          </Link>
        </div>

        <ChatHeader bot={bot} onBack={handleBack} />
        
        <div className="space-y-4">
          <AnimatePresence>
            {chatHistory.length > 0 && (
              <GreetingMessage 
                content={chatHistory[0].content}
                botName={bot.name}
              />
            )}
            {getMessagePairs().map((pair, index) => (
              <ChatMessage 
                key={index}
                userMessage={pair.userMessage}
                botMessage={pair.botMessage}
                botName={bot.name}
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
    </div>
  );
}