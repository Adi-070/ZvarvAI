import { Card, CardContent } from "@/components/ui/card";
import { BotCard } from "./BotCard";
import { botsByGenre } from "../data/constants";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export const BotGrid = ({ selectedGenre, onBotSelect }) => {
  const [customBots, setCustomBots] = useState([]);

  useEffect(() => {
    const fetchCustomBots = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('custom_bots')
        .select('*')
        .eq('user_id', user.id);

      if (!error && data) {
        // Fetch signed URLs for avatars
        const botsWithAvatars = await Promise.all(data.map(async (bot) => {
          let avatarUrl = bot.avatar;
          
          // If avatar is a filename in the avatars bucket, get a signed URL
          if (bot.avatar && !bot.avatar.startsWith('http')) {
            const { data: { publicUrl }, error: urlError } = supabase.storage
              .from('avatars')
              .getPublicUrl(bot.avatar);
            
            if (!urlError) {
              avatarUrl = publicUrl;
            }
          }

          return {
            id: bot.id,
            name: bot.name,
            description: bot.description,
            avatar: avatarUrl,
            accentColor: bot.accent_color,
            greeting: bot.greeting,
          };
        }));

        setCustomBots(botsWithAvatars);
      }
    };

    fetchCustomBots();
  }, []);

  // Combine predefined bots with custom bots
  const allBots = [...(botsByGenre[selectedGenre] || []), ...customBots];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
      {allBots.map((bot) => (
        <BotCard 
          key={bot.id} 
          bot={bot} 
          onClick={() => onBotSelect(bot)} 
        />
      ))}
      {allBots.length === 0 && (
        <Card className="col-span-full p-4 sm:p-6">
          <CardContent className="text-center text-gray-500 text-sm sm:text-base">
            No characters available in this genre yet.
          </CardContent>
        </Card>
      )}
    </div>
  );
};