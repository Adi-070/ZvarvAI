import { Card, CardContent } from "@/components/ui/card";
import { BotCard } from "./BotCard";
import { botsByGenre } from "../data/constants";

export const BotGrid = ({ selectedGenre, onBotSelect }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
    {botsByGenre[selectedGenre].map((bot) => (
      <BotCard 
        key={bot.id} 
        bot={bot} 
        onClick={() => onBotSelect(bot)} 
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
);