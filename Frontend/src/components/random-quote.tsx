import { useEffect, useState } from "react";

const QUOTES = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Don’t watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "Opportunities don't happen, you create them.",
    author: "Chris Grosser",
  },
  {
    text: "Dream big and dare to fail.",
    author: "Norman Vaughan",
  },
];

export function RandomQuote() {
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  return (
    <div className="text-center max-w-xl mx-auto">
      <blockquote className="text-2xl italic font-semibold text-muted-foreground">
        “{quote.text}”
      </blockquote>
      <div className="mt-4 text-lg font-medium text-primary">— {quote.author}</div>
    </div>
  );
}
