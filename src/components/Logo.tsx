type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "light", className = "" }: LogoProps) {
  const darkSquare = variant === "dark" ? "bg-white" : "bg-neutral-900";

  return (
    <span className={`grid shrink-0 grid-cols-2 gap-0.5 ${className}`}>
      <span className="h-2.5 w-2.5 rounded-sm bg-teal-500" />
      <span className="h-2.5 w-2.5 rounded-sm bg-violet-500" />
      <span className="h-2.5 w-2.5 rounded-sm bg-amber-400" />
      <span className={`h-2.5 w-2.5 rounded-sm ${darkSquare}`} />
    </span>
  );
}
