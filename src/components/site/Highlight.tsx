/**
 * Renders handover copy unchanged, but paints one phrase with the brand
 * gradient (and optionally a hand-drawn underline).
 */
export function Highlight({
  text,
  match,
  underline = false,
}: {
  text: string;
  match?: string;
  underline?: boolean;
}) {
  const start = match ? text.lastIndexOf(match) : -1;
  if (!match || start === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, start)}
      <span className="relative inline-block whitespace-nowrap">
        <span className="text-gradient">{match}</span>
        {underline ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 200 12"
            preserveAspectRatio="none"
            className="absolute -bottom-[0.18em] left-0 h-[0.22em] w-full overflow-visible"
          >
            <path
              d="M3 9 C 45 3, 120 2, 197 7"
              pathLength={1}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={4}
              strokeLinecap="round"
              className="draw-line"
            />
          </svg>
        ) : null}
      </span>
      {text.slice(start + match.length)}
    </>
  );
}
