import { SOURCE_COLORS, SOURCE_LABELS } from "@/lib/constants";
import type { Source } from "@/lib/types";

const SOURCES: Source[] = ["hotpepper", "line", "google", "phone", "walkin"];

export function SourceLegend() {
  return (
    <div className="flex items-center gap-4 mb-4">
      {SOURCES.map((source) => (
        <div key={source} className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: SOURCE_COLORS[source] }} />
          <span className="text-xs text-muted-foreground">{SOURCE_LABELS[source]}</span>
        </div>
      ))}
    </div>
  );
}
