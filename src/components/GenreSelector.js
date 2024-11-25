import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { genres } from "../data/constants";

export const GenreSelector = ({ selectedGenre, onGenreChange }) => (
  <Card className="bg-white/50 backdrop-blur-sm outline outline-2 outline-black shadow-md relative z-0">
    <CardHeader className="p-4 sm:p-6">
      <CardTitle className="text-lg sm:text-2xl">Choose Your Companion</CardTitle>
      <CardDescription className="text-sm sm:text-base">
        Select a genre to find your perfect conversation partner
      </CardDescription>
    </CardHeader>
    <CardContent className="p-3 sm:p-6">
      <Tabs defaultValue={selectedGenre} onValueChange={onGenreChange}>
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
);