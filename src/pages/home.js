'use client'

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { GenreSelector } from "../components/GenreSelector";
import { BotGrid } from "../components/BotGrid";
import { ChatHeader } from "../components/ChatHeader";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { GreetingMessage } from "../components/GreetingMessage";
import { useRouter } from 'next/router';
import { supabase } from "../../lib/supabase";
import { PlusCircle } from 'lucide-react'; 
import Link from "next/link";
import { botsByGenre } from "@/data/constants";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("movies-tv");
  const [selectedBot, setSelectedBot] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Add this useEffect to fetch user data
  useEffect(() => {
    // Check active session
    const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error checking session:', error.message)
        router.push('/login')
        return
      }
      
      if (!session) {
        router.push('/login')
        return
      }
      console.log(user?.user_metadata);

      setUser(session.user)
    } finally {
      setLoading(false)
      }
    }

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login')
      } else if (session) {
        setUser(session.user)
      }
    })

    checkSession()

    return () => {
      subscription?.unsubscribe()
    }
  }, [router])


  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleBotSelect = async (bot) => {
    // try {
    //   // Check if the bot is from the predefined_bots table
    //   const { data: predefinedBot, error: predefinedBotError } = await supabase
    //     .from('predefined_bots')
    //     .select('id')
    //     .eq('id', bot.id)
    //     .single();
  
    //   if (predefinedBot && !predefinedBotError) {
    //     // It's a predefined bot
    //     setSelectedBot(bot);
    //     setChatHistory([{ type: 'bot', content: bot.greeting}]);
    //     router.push(`/home/${bot.id}`);
    //   } else {
    //     // If not predefined, assume it's a custom bot
    //     router.push(`/home/${bot.id}`);
    //   }
    // } catch (error) {
    //   console.error("Error selecting bot:", error);
    //   alert("Unable to load bot. Please try again.");
    // }
    router.push(`/home/${bot.id}`);
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
        body: JSON.stringify({ 
          prompt: userMessage, 
          bot: selectedBot.id 
        }),
      });
  
      // Log the full response for debugging
      const responseText = await res.text();
      console.log('API Response:', res);
  
      // Check if the response is not OK
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}, response: ${responseText}`);
      }
  
      // Parse the JSON
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
      
      // More detailed error message
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
    setSelectedBot(null);
    setChatHistory([]);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-900 p-3 sm:p-6">
      <div className="absolute top-2 right-2 sm:fixed sm:top-4 sm:right-4 z-10">
  <div className="relative">
    <button
      onClick={() => setShowDropdown(!showDropdown)}
      className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-600 focus:outline-none focus:border-purple-700"
    >
      {user?.user_metadata?.picture ? (
        <img
          src={user.user_metadata.picture}
          alt="Profile"
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white">
          {user?.email?.[0]?.toUpperCase() || '?'}
        </div>
      )}
    </button>

    {showDropdown && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    )}
  </div>
</div>

<div className="max-w-7xl mx-auto">
  <div className="space-y-4 sm:space-y-6">
    <GenreSelector 
      selectedGenre={selectedGenre} 
      onGenreChange={setSelectedGenre} 
    />
    <Link 
      href="/create-bot"
      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      <PlusCircle size={20} />
      <span>Create Bot</span>
    </Link>
    <BotGrid 
      selectedGenre={selectedGenre} 
      onBotSelect={handleBotSelect} 
    />
  </div>
</div>
    </div>
  );
}