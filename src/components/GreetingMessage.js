// src/components/GreetingMessage.jsx
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const GreetingMessage = ({ content, botName }) => (
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
        <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base">
          {content}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

export default GreetingMessage;