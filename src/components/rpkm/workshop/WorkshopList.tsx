import type { JSX } from "astro/jsx-runtime";

import WorkshopCard from "@/components/rpkm/workshop/WorkshopCard";
import { ThemeProvider } from "@/config/ThemeContext";
import type { RpkmVariant } from "@/types/common";
import type { WorkshopData } from "@/types/rpkm-workshop/workshop";

interface WorkshopListProps {
  workshops: WorkshopData[];
  initialVariant?: RpkmVariant;
}

export default function WorkshopList({
  workshops,
  initialVariant,
}: WorkshopListProps): JSX.Element {
  return (
    <ThemeProvider initialVariant={initialVariant}>
      <div className="flex flex-col gap-8">
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.workshopId} {...workshop} />
        ))}
      </div>
    </ThemeProvider>
  );
}
