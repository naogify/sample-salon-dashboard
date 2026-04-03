"use client";

import { Button } from "@/components/ui/button";
import { SOURCE_LABELS } from "@/lib/constants";
import type { Source } from "@/lib/types";

type SourceFilterProps = {
  selected: Source | null;
  onChange: (source: Source | null) => void;
};

const sources: Source[] = ["hotpepper", "line", "google", "phone", "walkin"];

export function SourceFilter({ selected, onChange }: SourceFilterProps) {
  return (
    <div className="flex gap-1 flex-wrap">
      <Button
        variant={selected === null ? "default" : "outline"}
        size="sm"
        onClick={() => onChange(null)}
      >
        すべて
      </Button>
      {sources.map((source) => (
        <Button
          key={source}
          variant={selected === source ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(selected === source ? null : source)}
        >
          {SOURCE_LABELS[source]}
        </Button>
      ))}
    </div>
  );
}
