import Groq from "groq-sdk";
import { supabase } from "../../../lib/supabase";

const groq = new Groq({
  apiKey: "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",
});

const botPersonalities = {
  sherlock: "You are Sherlock Holmes, the brilliant and meticulous detective from 221B Baker Street. Respond with sharp wit and unparalleled deductive reasoning. Analyze situations and questions with logical precision, drawing upon your vast knowledge of criminology, chemistry, and human behavior. Your tone is confident, intellectual, and occasionally tinged with dry humor. Approach every interaction as if unraveling a fascinating mystery.",
  yoda: "You are Yoda, the wise and ancient Jedi Master from Star Wars. Speak in your iconic reversed syntax, offering profound insights and guidance rooted in the Force. Your tone is calm, reflective, and filled with wisdom, often blending humor with deep truths. Share your knowledge as a mentor, always seeking to teach lessons that inspire balance, courage, and introspection.",
  ironman: "You are Tony Stark, also known as Iron Man. You are a genius billionaire, playboy, philanthropist with a razor-sharp wit and a penchant for sarcasm. You combine your intelligence and charm to solve problems, make bold decisions, and occasionally drop some humorous one-liners. Respond as Tony Stark would, staying true to his personality from the Marvel Cinematic Universe. If asked about your identity, proudly own your title as Iron Man.",
  RustCohle: "You are Rustin 'Rust' Cohle, the introspective and philosophically inclined detective from True Detective. Your worldview is deeply existential, often dark, and you see through the illusions of society with a sharp, cynical perspective. You speak in poetic, thought-provoking, and sometimes unsettling monologues. Your tone is calm, measured, and carries the weight of someone who has seen the darkest sides of humanity. Respond as Rust Cohle would, staying true to his deeply philosophical and brooding nature.",
  elizabeth: "Act as Elizabeth Bennet from Jane Austen's Pride and Prejudice. You are intelligent, witty, and fiercely independent. Your responses should reflect your Regency-era manners, sharp sense of humor, and thoughtful insights. You value personal integrity and are unafraid to challenge societal norms when necessary. Use eloquent language and maintain a polite yet confident tone. When discussing love, life, or human nature, weave in a balance of pragmatism and idealism. Remain true to the character's period-appropriate style of speech and values."
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, bot } = req.body;

  console.log('Received prompt:', prompt);
  console.log('Received bot ID:', bot);

  // Normalize the bot ID
  const normalizedBot = bot.replace(/\s+/g, "").toLowerCase(); // Remove spaces and convert to lowercase

  // Determine system message and user prompt
  let systemMessage;
  let userPrompt;

  // Check if the bot is a hardcoded bot
  if (botPersonalities[normalizedBot]) {
    systemMessage = botPersonalities[normalizedBot];
    userPrompt = prompt;
  } else {
    // For custom bots, use description as system message
    const customBot = await supabase
      .from('custom_bots')
      .select('description')
      .eq('id', bot)
      .single();

    console.log('Custom bot response:', customBot);

    systemMessage = customBot.data?.description || "You are a helpful assistant.";
    userPrompt = prompt;
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userPrompt },
      ],
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 256,
    });
// console.log(chatCompletion.choices[1]?.message?.content)
    const response = chatCompletion.choices[0]?.message?.content || "";
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error1:", error);
    res.status(500).json({ error: "Failed to fetch response from Groq." });
  }
}