'use client'

import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { genres } from "../data/constants"
import { motion } from "framer-motion";

export const GenreSelector = ({ selectedGenre, onGenreChange }) => {
  return (
    <Card className="w-full  mx-auto bg-white/90 backdrop-blur-md border border-purple-100 shadow-xl relative z-10 overflow-hidden">
      <CardHeader className="p-6">
        <CardTitle className="text-xl text-center font-bold text-purple-900">
        <h1 className="text-base font-bold tracking-tighter sm:text-xl md:text-xl lg:text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Choose your companion
                </h1>
        </CardTitle>
        <CardDescription className="text-sm text-center text-purple-700 mt-2">
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Select a genre to find your perfect conversation partner
                </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Select defaultValue={selectedGenre} onValueChange={onGenreChange}>
          <SelectTrigger className="w-full bg-white border-2 border-purple-300 text-purple-900 rounded-lg shadow-sm hover:border-purple-500 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200">
            <SelectValue placeholder="Select a genre" />
          
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-purple-100 rounded-lg shadow-lg">
            <SelectGroup>
              {/* <SelectLabel className="px-2 py-1.5 text-sm font-semibold text-purple-900">Genres</SelectLabel> */}
              {genres.map((genre) => (
                <SelectItem 
                  key={genre.id} 
                  value={genre.id}
                  className="px-2 py-1.5 text-sm text-purple-700 hover:bg-purple-50 rounded cursor-pointer focus:bg-purple-100 focus:text-purple-900 transition-colors duration-150 ease-in-out"
                >
                  <div className="flex items-center">
                    <span className='text-base  tracking-tighter sm:text-base md:text-base lg:text-base bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600'>{genre.name}</span>
                    <Check className="ml-auto h-4 w-4 text-purple-500 opacity-0 group-data-[state=checked]:opacity-100" />
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}

