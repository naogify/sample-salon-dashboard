import { Badge } from "@/components/ui/badge";
import { SOURCE_COLORS, SOURCE_LABELS } from "@/lib/constants";
import type { Source } from "@/lib/types";

export function SourceBadge({ source }: { source: Source }) {
  return (
    <Badge
      variant="outline"
      className="border-transparent"
      style={{ backgroundColor: SOURCE_COLORS[source], color: "#fff" }}
    >
      {SOURCE_LABELS[source]}
    </Badge>
  );
}
