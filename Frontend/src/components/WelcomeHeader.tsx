interface WelcomeHeaderProps {
  username?: string;
}

export function WelcomeHeader({ username }: WelcomeHeaderProps) {
  const quotes = [
    "Believe you can and you're halfway there.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Dream big and dare to fail.",
    "Start where you are. Use what you have. Do what you can.",
    "Don't watch the clock; do what it does. Keep going.",
    "You are capable of amazing things."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="mb-5">
      <h1 className="text-xl text-card-foreground">
        Hey, <span className="font-bold">{username}</span>!
      </h1>
      <p className="text-muted-foreground">
        {randomQuote}
      </p>
    </div>
  );
}
