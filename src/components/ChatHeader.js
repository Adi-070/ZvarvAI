import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ChatHeader = ({ bot, onBack }) => (
    <Card className={`bg-gradient-to-r ${bot.accentColor}`}>
    <CardHeader className="flex flex-row items-center justify-between text-white p-3 sm:p-6">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <img 
          src={bot.avatar} 
          alt={bot.name} 
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-white" 
        />
        <div>
          <CardTitle className="text-base sm:text-lg">{bot.name}</CardTitle>
          <CardDescription className="text-gray-100 text-xs sm:text-sm">
            {bot.descc}
          </CardDescription>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-white hover:text-white hover:bg-white/20"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Back to characters</span>
      </Button>
    </CardHeader>
  </Card>
);