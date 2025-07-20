
import { useEffect, useState } from "react";

import type { JSX } from "astro/jsx-runtime";

import { Calendar, Clock4, MapPin } from "lucide-react";

import Frame from "@/components/common/react/Frame";
import { ThemeProvider } from "@/config/ThemeContext";
import { getMyWorkshopByRpkmWorkshop } from "@/data/rpkm-workshop/workshops";
import { type RPKMworkshop, getWorkshopsOfUserId } from "@/lib/workshopAPI";
import type { RpkmVariant } from "@/types/common";

interface MyWorkshopsProps {
  initialVariant?: RpkmVariant;
}

export default function MyWorkshops({
  initialVariant,
}: MyWorkshopsProps): JSX.Element {
  const [myWorkshopsData, setMyWorkshopsData] = useState<RPKMworkshop[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const myWorkshopsDataResponse = await getWorkshopsOfUserId();
      if (!myWorkshopsDataResponse.success || !myWorkshopsDataResponse.data) {
        return;
      }
      // Filter out workshops that are not registered
      setMyWorkshopsData(myWorkshopsDataResponse.data);
    };
    void fetchData();
  }, []);
  return (
    <ThemeProvider initialVariant={initialVariant}>
      {myWorkshopsData.length > 0 && (
        <div className="flex flex-col gap-8">
          <Frame size="sm" noWrapper noScroll>
            <div className="flex h-full w-full flex-col items-center justify-between px-3 pt-8 pb-5">
              <h1 className="text-center text-3xl font-bold text-nowrap">
                รอบกิจกรรมของคุณ
              </h1>
              <div className="flex gap-4">
                {myWorkshopsData
                  .map((workshop) => getMyWorkshopByRpkmWorkshop(workshop))
                  .map((workshop, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <img
                        src={workshop?.imgUrl}
                        alt="My Workshops"
                        className="mx-auto mt-4 h-[120px] w-[120px] border border-3 border-white"
                      />
                      <h1 className="text-center text-3xl font-bold text-nowrap">
                        {workshop?.title}
                      </h1>

                      <div className="flex flex-col gap-2 pb-4 text-[0.75rem]">
                        <span className="flex gap-2">
                          <Calendar size={20} />
                          {workshop?.date}
                        </span>
                        <span className="flex gap-2">
                          <MapPin size={20} />
                          {workshop?.location}
                        </span>
                        <span className="flex gap-2">
                          <Clock4 size={20} />
                          {workshop?.time}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Frame>
        </div>
      )}
    </ThemeProvider>
  );
}
