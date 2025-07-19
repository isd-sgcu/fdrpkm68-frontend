import type { RPKMworkshop } from "@/lib/workshopAPI";
import { WorkshopType } from "@/types/rpkm-workshop/schema";
import type {
  MyWorkshopData,
  WorkshopData,
} from "@/types/rpkm-workshop/workshop";

export const keychainWorkshop: WorkshopData = {
  title: "Keychain Workshop",
  description:
    "ออกแบบพวงกุญแจหรือที่ห้อยกระเป๋าเฉพาะตัว สำหรับนิสิตรุ่น CU 109",
  metaDate: "1 สิงหาคม 2568",
  metaLocation: "ลานพระบรมรูปสองรัชกาล",
  metaTime: "6 รอบ รอบละ 100 คน",
  details: {
    date: "1 สิงหาคม 2568",
    locations: [
      "ลานพระบรมรูปสองรัชกาล",
      // "อาคารจามจุรี 9",
    ],
    times: [
      "รอบที่ 1 : 10.30-11.00",
      "รอบที่ 2 : 11.10-11.40",
      "รอบที่ 3 : 13.00-13.30",
      "รอบที่ 4 : 13.40-14.10",
      "รอบที่ 5 : 14.20-14.50",
      "รอบที่ 6 : 15.00-15.30",
    ],
  },
  current: 300,
  total: 600,
  workshopType: WorkshopType.KEYCHAIN,
};
export const diffuserWorkshop: WorkshopData = {
  title: "Diffuser Workshop",
  description:
    "ออกแบบ Diffuser โดยสามารถเลือกกลิ่นประจำตัวได้ สำหรับนิสิตรุ่น CU 109",
  metaDate: "1 สิงหาคม 2568",
  metaLocation: "ลานพระบรมรูปสองรัชกาล",
  metaTime: "6 รอบ รอบละ 100 คน",
  details: {
    date: "1 สิงหาคม 2568",
    locations: [
      "ลานพระบรมรูปสองรัชกาล",
      // "อาคารจามจุรี 9",
    ],
    times: [
      "รอบที่ 1 : 10.30-11.00",
      "รอบที่ 2 : 11.10-11.40",
      "รอบที่ 3 : 13.00-13.30",
      "รอบที่ 4 : 13.40-14.10",
      "รอบที่ 5 : 14.20-14.50",
      "รอบที่ 6 : 15.00-15.30",
    ],
  },
  current: 120,
  total: 600,
  workshopType: WorkshopType.DIFFUSER,
};

export function getMyWorkshopByRpkmWorkshop(
  rpkmWorkshop: RPKMworkshop
): MyWorkshopData | null {
  switch (rpkmWorkshop.workshopType) {
    case WorkshopType.KEYCHAIN:
      return {
        title: "Keychain",
        imgUrl: "/images/rpkm/keychain-workshop.png",
        date: keychainWorkshop.metaDate,
        location: keychainWorkshop.metaLocation,
        time:
          keychainWorkshop.details.times[rpkmWorkshop.workshopTime - 1] || "",
      };
    case WorkshopType.DIFFUSER:
      return {
        title: "Diffuser",
        imgUrl: "/images/rpkm/diffuser-workshop.png",
        date: diffuserWorkshop.metaDate,
        location: diffuserWorkshop.metaLocation,
        time:
          diffuserWorkshop.details.times[rpkmWorkshop.workshopTime - 1] || "",
      };
    default:
      return null;
  }
}

export const workshops: WorkshopData[] = [keychainWorkshop, diffuserWorkshop];

export function updateWorkshopParticipation(
  workshop: WorkshopData,
  current: number,
  total: number
): WorkshopData {
  return {
    ...workshop,
    current,
    total,
  };
}
