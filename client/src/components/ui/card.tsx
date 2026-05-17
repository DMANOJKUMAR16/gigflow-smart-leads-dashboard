type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl border bg-white shadow ${className}`}
      {...props}
    />
  );
}

export function CardContent({
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`p-6 ${className}`}
      {...props}
    />
  );
}