import { TriangleAlert } from "lucide-react";

interface ErrorCardProps {
  title: string;
  description: string;
}

export function ErrorCard({ title, description }: ErrorCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-8 backdrop-blur">
      <TriangleAlert className="h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
