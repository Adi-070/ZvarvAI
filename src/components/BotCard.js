import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const BotCard = ({ bot, onClick }) => (
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
      <CardDescription className="text-xs text-center sm:text-sm">
  {bot.desc ? (
    bot.desc
  ) : (
    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-purple-500 rounded">
      Custom
    </span>
  )}
</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);