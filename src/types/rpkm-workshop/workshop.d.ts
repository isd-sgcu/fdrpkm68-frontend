import type { WorkshopType } from "@/types/rpkm-workshop/schema";

export interface WorkshopDetails {
  date: string;
  locations: string[];
  times: string[];
}

export interface WorkshopData {
  title: string;
  description: string;
  metaDate: string;
  metaLocation: string;
  metaTime: string;
  details: WorkshopDetails;
  current: number;
  total: number;
  workshopType: WorkshopType;
}

export interface MyWorkshopData {
  title: string;
  imgUrl: string;
  date: string;
  location: string;
  time: string;
}
