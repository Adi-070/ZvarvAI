import { Send, Loader2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const ChatInput = ({ prompt, onPromptChange, onSubmit, loading }) => (
  <Card>
    <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
      <form onSubmit={onSubmit} className="flex gap-2 sm:gap-4">
        <Textarea 
          placeholder="Ask a question..." 
          value={prompt} 
          onChange={(e) => onPromptChange(e.target.value)} 
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
);