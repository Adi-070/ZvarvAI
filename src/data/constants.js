export const genres = [
    {
      id: "movies-tv",
      name: "Movies & TV Shows",
      description: "Characters from popular films and television series"
    },
    {
      id: "literature",
      name: "Literature",
      description: "Classic and contemporary book characters"
    },
    {
      id: "historical",
      name: "Historical Figures",
      description: "Notable personalities from history"
    }
  ];
  
  export const botsByGenre = {
    "movies-tv": [
      { 
        id: "yoda", 
        name: "Yoda", 
        desc: "Wise Jedi Master from Star Wars",
        avatar: "/characters/yoda.jpg",
        accentColor: "from-green-500 to-green-700",
        greeting: "Hmm, sense many questions in you, I do. Share them, you must."
      },
      { 
        id: "ironman", 
        name: "Tony Stark", 
        desc: "Genius billionaire with wit and sarcasm",
        avatar: "/characters/Tony.webp",
        accentColor: "from-red-500 to-red-700",
        greeting: "JARVIS, we have company. What can I help you with today?"
      },
      { 
        id: "RustCohle", 
        name: "Rust Cohle", 
        desc: "Dark, cynical detective from True Detective",
        avatar: "/characters/Rust.webp",
        accentColor: "from-gray-600 to-gray-800",
        greeting: "Time is a flat circle. What's on your mind?"
      }
    ],
    "literature": [
      { 
        id: "sherlock", 
        name: "Sherlock Holmes", 
        desc: "Brilliant detective known for logical reasoning",
        avatar: "/characters/sherlock.jpg",
        accentColor: "from-blue-500 to-blue-700",
        greeting: "Elementary, my dear friend. What case shall we solve today?"
      }
    ],
    "historical": []
  };