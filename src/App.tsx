import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

// Large array of words
const wordBank = [
    "CSS styling basics",
    "CSS text styling",
    "CSS layout",
    "Dynamic scripting with JavaScript",
    "What is JavaScript?",
    "A first splash into JavaScript",
    "What went wrong? Troubleshooting JavaScript",
    "Storing the information you need — Variables",
    "Basic math in JavaScript — numbers and operators",
    "Handling text — strings in JavaScript",
    "Useful string methods",
    "Arrays",
    "Challenge: Silly story generator",
    "Making decisions in your code — conditionals",
    "Looping code",
    "Functions — reusable blocks of code",
    "Build your own function",
    "Function return values",
    "Introduction to events",
    "Event bubbling",
    "Challenge: Image gallery",
    "JavaScript object basics",
    "DOM scripting introduction",
    "Making network requests with JavaScript",
    "Working with JSON",
    "Debugging JavaScript and handling errors",
    "JavaScript frameworks and libraries",
    "Accessibility",
    "Design for developers",
    "Version control",
    "Extension modules",
    "Advanced JavaScript objects",
    "Client-side web APIs",
    "Asynchronous JavaScript",
    "Web forms",
    "Understanding client-side tools",
    "Server-side websites",
    "Web performance",
    "Testing",
    "Transform and animate CSS",
    "Security and privacy",
    "Further resources",
    "How to solve common problems",
    "About",
    "Resources for educators",
    "Changelog",
    "In this article",
    "Prerequisites",
    "Tutorials and challenges",
    "See also"
];

function App() {
  const [dailyWords, setDailyWords] = useState<string[]>([]);
  const [isDebugMode, setIsDebugMode] = useState(false);

  // Function to get today's date as a string
  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Function to generate random words
  const generateRandomWords = () => {
    const shuffled = [...wordBank].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  };

  // Function to get or generate daily words
  const getDailyWords = () => {
    const stored = localStorage.getItem('dailyWords');
    const storedDate = localStorage.getItem('dailyWordsDate');
    const today = getTodayString();

    if (stored && storedDate === today) {
      return JSON.parse(stored);
    }

    const newWords = generateRandomWords();
    localStorage.setItem('dailyWords', JSON.stringify(newWords));
    localStorage.setItem('dailyWordsDate', today);
    return newWords;
  };

  // Initialize words on component mount
  useEffect(() => {
    setDailyWords(getDailyWords());

    // Check for midnight reset
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      setDailyWords(getDailyWords());
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  // Debug refresh function
  const handleDebugRefresh = () => {
    const newWords = generateRandomWords();
    setDailyWords(newWords);
    localStorage.setItem('dailyWords', JSON.stringify(newWords));
    localStorage.setItem('dailyWordsDate', getTodayString());
  };

  // Toggle debug mode with keyboard shortcut (Ctrl + Shift + D)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsDebugMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-purple-500/20">
          <section className="space-y-8">
            <header className="text-center space-y-3">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Daily Words
              </h1>
              <p className="text-gray-400 text-lg">
                Your learning journey for {new Date().toLocaleDateString()}
              </p>
            </header>
            
            <article className="space-y-4">
              {dailyWords.map((word, index) => (
                <div
                  key={index}
                  className="group bg-gray-900 rounded-xl p-5 border border-purple-500/20
                           hover:border-purple-500/40 hover:bg-gray-800
                           transition-all duration-300 ease-in-out"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-100 font-medium">{word}</span>
                    <div className="h-2 w-2 rounded-full bg-purple-500/50 group-hover:bg-purple-400 
                                  transition-all duration-300"></div>
                  </div>
                </div>
              ))}
            </article>

            {isDebugMode && (
              <footer>
                <button
                  onClick={handleDebugRefresh}
                  className="mt-6 flex items-center justify-center w-full gap-2 px-6 py-3 
                           bg-purple-600/20 text-purple-300 rounded-xl border border-purple-500/30
                           hover:bg-purple-600/30 hover:text-purple-200 hover:border-purple-500/50
                           transition-all duration-300"
                >
                  <RefreshCw className="animate-spin-slow" size={18} />
                  Debug Refresh
                </button>
              </footer>
            )}

            <aside>
              <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-2">
                Press 
                <kbd className="px-2 py-1 text-xs bg-gray-900 rounded-md">Ctrl</kbd> + 
                <kbd className="px-2 py-1 text-xs bg-gray-900 rounded-md">Shift</kbd> + 
                <kbd className="px-2 py-1 text-xs bg-gray-900 rounded-md">D</kbd> 
                to toggle debug mode
              </p>
            </aside>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;