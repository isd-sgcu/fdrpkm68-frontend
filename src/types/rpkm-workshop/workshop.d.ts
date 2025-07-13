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
  workshopId: string;
}
