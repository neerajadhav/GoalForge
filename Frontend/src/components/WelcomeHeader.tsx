interface WelcomeHeaderProps {
  username?: string;
}

export function WelcomeHeader({ username }: WelcomeHeaderProps) {
  return (
    <div className="mb-5">
      <h1 className="text-xl text-card-foreground">
        Welcome back, <span className="font-bold">{username}</span>!
      </h1>
      <p className="text-muted-foreground">
        Here&apos;s what you need to focus on today.
      </p>
    </div>
  );
}
